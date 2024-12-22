bitwise-logger
==============

Many years ago, in Java, I developed a preference for [bitwise](https://abdulapopoola.com/2016/05/30/understanding-bit-masks/) loggers, and hoped someone would eventually release one. That never happened and I adapted to the node highwatermark style of loggers.

Recently though I had a need for detailed, verbose logging that could be minimized, this called not only for more granular control (so you aren't dumping at a rate distorting timing), but also for segmentation of output. For compatibility's sake I included both the [syslog](https://en.wikipedia.org/wiki/Syslog#Severity_levels) and [log4j](https://en.wikipedia.org/wiki/Log4j) bins. This should cover almost *any* scenario.

It includes support for bitwise operations on the logger and the log event as well as channels and works in node and the browser.

Usage
-----

The simplest thing to do is use the default static instance

```javascript
import Logger from 'bitwise-logger';
//...
Logger.log('foo', Logger.DEBUG | Logger.INFO ) //log to either debug level
```

You can also use a more traditional syntax:

```javascript
import Logger as logger from 'bitwise-logger';
const { 
    //if Syslog:
    //eslint-disable-next-line no-unused-vars
    EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, 
    NOTICE, INFORMATIONAL, DEBUG 
    // If log4j: 
    // FATAL, ERROR, WARN, INFO, DEBUG, TRACE
} = logger;

//ADD YOUR OWN:
const MY_LOG_LEVEL = 1 << 9;

//...
logger.log('foo', DEBUG | INFORMATIONAL ) //log to either debug level
```

You can also configure and use your own instance

```javascript
import { Logger } from 'bitwise-logger';
import consoleBridge from 'bitwise-logger/src/console.js';
//...
// create a new logger
const logger = new Logger();
//only log errors and info
logger.level = Logger.ERROR & Logger.INFO;
// bind to the built-in console functions
logger.registerChannel(consoleBridge);
//log to both debug or info (only one instance will be output)
logger.log('foo', Logger.DEBUG | Logger.INFO )
// only output if both debug and info are enabled
logger.log('bar', Logger.DEBUG & Logger.INFO )


```

Testing
-------

```bash
npm run test
```
to run the same test inside the browser:

```bash
npm run browser-test
```
to run the same test inside docker:

```bash
npm run container-test
```
