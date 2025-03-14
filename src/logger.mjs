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