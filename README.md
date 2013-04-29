Humanizer [![Build Status](https://drone.io/github.com/FGRibreau/humanizer/status.png)](https://drone.io/github.com/FGRibreau/humanizer/latest)
========

Humanizer a value. `Humanizer` provides "ago" libraries-like capabilities and so on...
In fact, unlike other libraries, `humanizer` can work with any type of unit at any scale.

Humanizer is tested against browsers and NodeJS.

### NPM
```bash
npm install humanizer
```

### Usage

```javascript
var Humanizer = require('humanizer');

// Define the time unit
time = new Humanizer('ms', 1) // the base unit is 1 `ms`
   .unit('day',  24*3600*1000)
   .unit('hour', 3600*1000)
   .unit('min',  60*1000)
   .unit('sec',  1000)
   .setRound(function roundFn(val){ // set a (optional) round function
    return Math.round(val*10)/10;
  });


### `humanizer.humanize(value, [toUnit])`

```javascript
time.humanize(60*1000); // returns [60, 'sec']
time.humanize(20*3600*1000); // returns [20, 'hour']
time.humanize(20*3600*1000, 'sec'); // returns [20, 'sec'] (we just did a unit conversion)
```

### `humanizer.humanizeRange({Number}value, {Number}start, {Number}end, [{Unit}toUnit])`

```javascript
time.humanizeRange(4956, +new Date(2013, 3, 29), +new Date(2013, 3, 29, 15, 47)));
```
Returns `[314, 'hour']` which we could translate to 314 *things* per `hour`.

Sometimes you may want to specify a prefered unit:
```javascript
time.humanizeRange(100, +new Date(), +new Date()+(24*3600*1000), 'min');
```
Returns `[0.1, 'min']`. Humm that's not good enough, we wanted the "min" unit but "0.1 things per min" do not say much to the user.

### `humanizer.smartMode({Boolean}toggle)`
```javascript
time.smartMode(true);
```

With smartMode enabled if the value in `toUnit` is to low (less than 1) humanizer will automatically find the best unit to display it.

```javascript
time.humanizeRange(100, +new Date(), +new Date()+(24*3600*1000), 'min');
```
Returns `[4.2, 'hour']`, now that's better.

In fact the previous line with `smartMode === true` is the same as `humanizeRange` without the `toUnit` argument when the value is less than 0.
```javascript
time.humanizeRange(100, +new Date(), +new Date()+(24*3600*1000));
```

### `humanizer.setSelector({Function}f(currentValue, unit, rawValue))`

Well, but sometimes you may want to tell humanizer when a value is "good enough" and when it's not. By default, humanizer use the following function
```javascript
Humanize.DEFAULT_SELECTOR; // =>
function(currentValue, unit, rawValue){
  return currentValue > 1 && currentValue < 1000;
}
```

To change this, just use `time.setSelector({Function});`

```javascript
time.setSelector(function(currentValue, unit, rawValue){
  return currentValue > 10 && currentValue < 1000;
});
```
