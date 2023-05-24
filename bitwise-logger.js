//TODO: Investigate: does not like being external on browser load, despite no deps
const makeOutputter = (outputter)=>{
    return { // should work for any console.log() interface
        log: (level, message, ...data)=>{
            let processed = false;
            if( level & Logger.TRACE && (!processed)){
                (outputter.trace || outputter.log)(...[message].concat(data))
                processed = true;
            };
            if( level & Logger.DEBUG && (!processed)){
                (outputter.debug || outputter.log)(...[message].concat(data))
                processed = true;
            };
            if( level & Logger.INFO && (!processed)){
                (outputter.info || outputter.log)(...[message].concat(data))
                processed = true;
            };
            if( level & Logger.WARN && (!processed)){
                (outputter.warn || outputter.log)(...[message].concat(data))
                processed = true;
            };
            if( level & Logger.ERROR && (!processed)){
                (outputter.error || outputter.log)(...[message].concat(data))
                processed = true;
            };
            if( level & Logger.SILENT && (!processed)){
                (outputter.trace || outputter.log)(...[message].concat(data))
                processed = true;
            };
        },
        
    }
};

export class Logger{
    // a bitwise logger because, after this many years, there isn't one in NPM
    static TRACE  =  1; //<< 0
    static DEBUG  =  1 << 1;
    static INFO   =  1 << 2;
    static WARN   =  1 << 3;
    static ERROR  =  1 << 4;
    static SILENT =  1 << 5;
    static DEFAULT = null;
    static global = null;
    
    static log(message, level, context='*', ...data){
        return Logger.global.log(message, level, context, ...data);
    }
    
    constructor(options={}){
        this.options = options;
        this.level = options.level || Logger.DEFAULT;
        this.context = options.context || null;
        this.channels = [];
    }
    
    log(identifier, level, context='*', ...data){
        this.channels.forEach((channel)=>{
            const thisLevel = channel.level || this.level;
            if(thisLevel & level){
                if(
                    // the context is global
                    context === '*' || 
                    // there is no context globally
                    (!this.context) || 
                    // the contexts match
                    context === this.context || 
                    // the log context is global
                    this.context === '*' 
                ){
                    channel.log(level, identifier, ...data);
                }
            }
        });
    }
    
    registerChannel(channel){
        this.channels.push(channel)
    }
}

Logger.DEFAULT = Logger.WARN | Logger.ERROR;

//static logger
Logger.global = new Logger();
Logger.global.TRACE = Logger.TRACE;
Logger.global.DEBUG = Logger.DEBUG;
Logger.global.INFO = Logger.INFO;
Logger.global.WARN = Logger.WARN;
Logger.global.ERROR = Logger.ERROR;
Logger.global.SILENT = Logger.SILENT;
try{
    Logger.global.registerChannel(makeOutputter(console));
}catch(ex){
    console.log('Logger: Did not register default console channel.')
}
export default Logger.global;