//import { chai } from 'environment-safe-chai'; 
import { chai } from '@environment-safe/chai'; 
const should = chai.should();
//import { intercept } from 'environment-safe-console-intercept';
import { intercept } from '@environment-safe/console-intercept';
import { Logger, makeConsoleChannel } from '../src/index.mjs';
import * as fs from 'fs';

const testLevel = (level, handler)=>{
    let text = '';
    const terminate = intercept((interceptedText)=>{
        text += interceptedText;
        return '';
    });
    const logger = new Logger({ level });
    logger.registerChannel(makeConsoleChannel(console));
    try{
        handler(logger, ()=>{
            return text;
        }, terminate);
    }catch(ex){
        terminate();
        throw ex;
    }
}

describe('@environment-safe/logger', ()=>{
    describe('test ERROR', ()=>{
        
        it('outputs an ERROR message with custom logger', ()=>{
            testLevel(Logger.ERROR, (logger, captured, terminate)=>{
                logger.log('foo', Logger.ERROR);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('does not output an ERROR with mismatched custom logger', ()=>{
            testLevel(Logger.INFO, (logger, captured, terminate)=>{
                logger.log('foo', Logger.ERROR);
                captured().trim().should.equal('');
                terminate();
            });
        });
        
    });
    
    describe('test WARN', ()=>{
        
        it('outputs a WARN message with custom logger', ()=>{
            testLevel(Logger.WARN, (logger, captured, terminate)=>{
                logger.log('foo', Logger.WARN);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('does not output a WARN with mismatched custom logger', ()=>{
            testLevel(Logger.INFO, (logger, captured, terminate)=>{
                logger.log('foo', Logger.WARN);
                captured().trim().should.equal('');
                terminate();
            });
        });
        
    });
    
    describe('test TRACE', ()=>{
        
        it('outputs a TRACE message with custom logger', ()=>{
            testLevel(Logger.TRACE, (logger, captured, terminate)=>{
                logger.log('foo', Logger.TRACE);
                captured().trim().should.contain('foo');
                terminate();
            });
        });
        
        it('does not output a TRACE with mismatched custom logger', ()=>{
            testLevel(Logger.INFO, (logger, captured, terminate)=>{
                logger.log('foo', Logger.TRACE);
                captured().trim().should.equal('');
                terminate();
            });
        });
        
    });
    
    describe('test DEBUG', ()=>{
        
        it('outputs a DEBUG message with custom logger', ()=>{
            testLevel(Logger.DEBUG, (logger, captured, terminate)=>{
                logger.log('foo', Logger.DEBUG);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('does not output a DEBUG with mismatched custom logger', ()=>{
            testLevel(Logger.INFO, (logger, captured, terminate)=>{
                logger.log('foo', Logger.DEBUG);
                captured().trim().should.equal('');
                terminate();
            });
        });
        
    });
    
    describe('test INFO', ()=>{
        
        it('outputs an INFO message with custom logger', ()=>{
            testLevel(Logger.INFO, (logger, captured, terminate)=>{
                logger.log('foo', Logger.INFO);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('does not output an INFO with mismatched custom logger', ()=>{
            testLevel(Logger.DEBUG, (logger, captured, terminate)=>{
                logger.log('foo', Logger.INFO);
                captured().trim().should.equal('');
                terminate();
            });
        });
        
    });
    
    describe('test ALL', ()=>{
        
        it('outputs an ERROR message with custom logger', ()=>{
            testLevel(Logger.ALL, (logger, captured, terminate)=>{
                logger.log('foo', Logger.ERROR);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('outputs an INFO message with custom logger', ()=>{
            testLevel(Logger.ALL, (logger, captured, terminate)=>{
                logger.log('foo', Logger.INFO);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('outputs an DEBUG message with custom logger', ()=>{
            testLevel(Logger.ALL, (logger, captured, terminate)=>{
                logger.log('foo', Logger.DEBUG);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('outputs an WARN message with custom logger', ()=>{
            testLevel(Logger.ALL, (logger, captured, terminate)=>{
                logger.log('foo', Logger.WARN);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
        it('outputs an TRACE message with custom logger', ()=>{
            testLevel(Logger.ALL, (logger, captured, terminate)=>{
                logger.log('foo', Logger.TRACE);
                captured().trim().should.equal('foo');
                terminate();
            });
        });
        
    });
    
});
