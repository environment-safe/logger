import { Logger } from './logger.mjs';
const CUSTOM1 = 1 << 9;
const CUSTOM2 = 1 << 10;
const CUSTOM3 = 1 << 11;
//TODO: Investigate: does not like being external on browser load, despite no deps
export const makeChannel = (outputter)=>{
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

export default makeChannel(console);