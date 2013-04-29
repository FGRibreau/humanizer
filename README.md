Humanize [![Build Status](https://drone.io/github.com/FGRibreau/humanize/status.png)](https://drone.io/github.com/FGRibreau/humanize/latest)
========

Humanize a value. `Humanize` provides "ago" libraries-like capabilities and so on...
In fact, unlike other libraries, `humanize` can work with any type of unit and with any scale.

```javascript
var time = require('../Humanize');

// Define the time unit
time = new Humanize('ms', 1) // the base unit is 1 `ms`
   .unit('day',  24*3600*1000)
   .unit('hour', 3600*1000)
   .unit('min',  60*1000)
   .unit('sec',  1000)
   .setRound(function roundFn(val){ // set a (optional) round function
    return Math.round(val*10)/10;
  });

// time.humanize(value, [preferedUnit]);
time.humanize(60*1000); // [60, 'sec']
time.humanize(20*3600*1000); // [20, 'hour']
time.humanize(20*3600*1000, 'sec'); // [20, 'sec'] (feels more like a conversion to me though)

// time.humanizeRange(value, start, end, [preferedUnit]);
time.humanizeRange(4956, +new Date(2013, 3, 29), +new Date(2013, 3, 29, 15, 47)));
// -> [314, 'hour']
// -> 314 'things' by `hour`

```
