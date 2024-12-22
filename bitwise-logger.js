const CUSTOM1 = 1 << 9;
const CUSTOM2 = 1 << 10;
const CUSTOM3 = 1 << 11;
//TODO: Investigate: does not like being external on browser load, despite no deps
const makeOutputter = (outputter)=>{
    return { // should work for any console.log() interface
        log: (level, message, ...data)=>{
            let processed = false;
            const argumes = [message].concat(data);
            if( level & Logger.TRACE && (!processed)){
                (outputter.trace || outputter.log)(...argumes)
                processed = true;
            };
            if( level & Logger.DEBUG && (!processed)){
                (outputter.debug || outputter.log)(...argumes)
                processed = true;
            };
            if( level & Logger.INFO && (!processed)){
                (outputter.info || outputter.log)(...argumes)
                processed = true;
            };
            if( level & Logger.WARN && (!processed)){
                (outputter.warn || outputter.log)(...argumes)
                processed = true;
            };
            if( level & Logger.ERROR && (!processed)){
                (outputter.error || outputter.log)(...argumes)
                processed = true;
            };
            if( level & Logger.SILENT && (!processed)){
                (outputter.trace || outputter.log)(...argumes)
                processed = true;
            };
            if( level & CUSTOM1 && (!processed)){
                (outputter.log)(...argumes)
                processed = true;
            };
            if( level & CUSTOM2 && (!processed)){
                (outputter.log)(...argumes)
                processed = true;
            };
            if( level & CUSTOM3 && (!processed)){
                (outputter.log)(...argumes)
                processed = true;
            };
        },
        
    }
};

export class Logger{
    // a bitwise logger because, after this many years, there isn't one in NPM
    // uses a union of syslog and log4j using bitmasked values for
    // granular control
    // https://en.wikipedia.org/wiki/Syslog#Severity_levels
    // https://en.wikipedia.org/wiki/Log4j
    static EMERGENCY     =  1;//<< 0
    static ALERT         =  1   << 1;
    static FATAL         =  1   << 2;
    static CRITICAL      =  1   << 2;
    static ERROR         =  1   << 3;
    static WARNING       =  1   << 4;
    static WARN          =  1   << 4;
    static NOTICE        =  1   << 5;
    static INFORMATIONAL =  1   << 6;
    static INFORMATION   =  1   << 6;
    static INFO          =  1   << 6;
    static DEBUG         =  1   << 7;
    static TRACE         =  1   << 8;
    static SILENT        =  0;
    static ALL           =  Number.MAX_SAFE_INTEGER;
    static DEFAULT = null;
    static global  = null;
    
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

Logger.DEFAULT = 
    Logger.WARN      | 
    Logger.ERROR     | 
    Logger.FATAL     | 
    Logger.EMERGENCY | 
    Logger.ALERT     ;

//static logger
Logger.global = new Logger();
Logger.global.TRACE = Logger.TRACE;
Logger.global.DEBUG = Logger.DEBUG;
Logger.global.INFO = Logger.INFO;
Logger.global.WARN = Logger.WARN;
Logger.global.ERROR = Logger.ERROR;
Logger.global.EMERGENCY = Logger.EMERGENCY;
Logger.global.ALERT = Logger.ALERT;
Logger.global.INFORMATIONAL = Logger.INFORMATIONAL;
Logger.global.INFORMATION = Logger.INFORMATION;
Logger.global.WARNING = Logger.WARNING;
Logger.global.NOTICE = Logger.NOTICE;
Logger.global.FATAL = Logger.FATAL;
Logger.global.SILENT = Logger.SILENT;
Logger.global.ALL = Logger.ALL;
try{
    Logger.global.registerChannel(makeOutputter(console));
}catch(ex){
    console.log('Logger: Did not register default console channel.')
}
export default Logger.global;