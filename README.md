bitwise-logger
==============

Many years ago, in Java, I developed a preference for bitwise loggers, and hoped someone would eventually release one. That never happened and I adapted to the node highwatermark style of loggers.

Recently though I had a need for detailed, verbose logging that could be minimized, this called not only for more granular control (so you aren't dumping at a rate distorting timing), but also for segmentation of output. 

It includes support for bitwise operations on the logger and the log event as well as channels and works in node and the browser.

Usage
-----

The simplest thing to do is use the default static instance

```javascript
import Logger from 'bitwise-logger';
//...
Logger.log('foo', Logger.DEBUG & Logger.INFO ) //log to either debug level
```

You can also configure and use your own instance

```javascript
import { Logger } from 'bitwise-logger';
import consoleBridge from 'bitwise-logger/src/console.js';
//...
const logger = new Logger(); // create a new logger
logger.level = Logger.ERROR & Logger.INFO; //only log errors and info
logger.registerChannel(consoleBridge); // bind to the built-in console functions
logger.log('foo', Logger.DEBUG & Logger.INFO ) //log to either debug level
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
