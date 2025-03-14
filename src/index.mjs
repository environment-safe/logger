import { Logger } from './logger.mjs';
import { makeChannel } from './console.mjs';
const makeConsoleChannel = makeChannel;
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
    Logger.global.registerChannel(makeChannel(console));
}catch(ex){
    console.log('Logger: Did not register default console channel.')
}
export { Logger, makeConsoleChannel };
export default Logger.global;