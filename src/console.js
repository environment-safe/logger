import { Logger } from '../bitwise-logger.js';
export const makeOutputter = (outputter)=>{
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
}

export default makeOutputter(console);