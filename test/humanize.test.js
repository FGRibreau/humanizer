var Humanize = require('../Humanize');
var _        = require('lodash');
var time = null;
module.exports  = {
  setUp: function(done) {
    time   = new Humanize('ms', 1);
    done();
  },
  tearDown: function(done) {
    time = null;
    done();
  },

  'constructor': function(t){
    t.equal(typeof Humanize, 'function');
    t.done();
  },

 '.unit should automatically sort the inner array by unit': function(t){
   time
     .unit('day', 24*3600*1000) // returns true if the value})
     .unit('sec', 1000)
     .unit('min', 60*1000)
     .unit('hr', 3600*1000);

   t.deepEqual(_.pluck(time._units, 'unit'), ['ms', 'sec', 'min', 'hr', 'day']);
   t.done();
 },

 '.sortBy': function(t){
   time
     .unit('day', 24*3600*1000)
     .unit('sec', 1000)
     .sortBy(function(unitA, unitB){return unitB.value - unitA.value;})
     .unit('min', 60*1000)
     .unit('hr', 3600*1000);

   t.deepEqual(_.pluck(time._units, 'unit'), ['ms', 'sec', 'min', 'hr', 'day'].reverse());
   t.done();
 },

 '.humanize (without specified units)': function(t){
   t.deepEqual(time.humanize(1000), [1000, 'ms'], 'without other unit than base unit');
   t.done();
 },

 '.humanize': function(t){
   time
   .unit('day',  24*3600*1000)
   .unit('hour', 3600*1000)
   .unit('min',  60*1000)
   .unit('sec',  1000);

   var ts = +new Date();

   t.deepEqual(time.humanize(10), [10, 'ms']);
   t.deepEqual(time.humanize(1000), [1000, 'ms']);
   t.deepEqual(time.humanize(60*1000), [60, 'sec']);
   t.deepEqual(time.humanize(10*60*1000), [600, 'sec']);
   t.deepEqual(time.humanize(20*3600*1000), [20, 'hour']);
   t.deepEqual(time.humanize(10*24*3600*1000), [240, 'hour']);

   t.deepEqual(time.humanize(20*3600*1000, 'sec'), [72000, 'sec']);

   t.done();
 },

  '.humanizeRange': function(t){
    time
    .unit('day',  24*3600*1000)
    .unit('hour', 3600*1000)
    .unit('min',  60*1000)
    .unit('sec',  1000)
    .setRound(function(val){
      return Math.round(val*10)/10;
    });

    // In item per `unit`
    t.deepEqual(
        time.humanizeRange(1841, +new Date(2013, 3, 29), +new Date(2013, 3, 29, 15, 47)),
        [116.6, 'hour']);

    t.deepEqual(
        time.humanizeRange(1841, +new Date(2013, 3, 29), +new Date(2013, 3, 29, 15, 47), 'min'),
        [1.9, 'min']);

    t.deepEqual(
        time.humanizeRange(4956, +new Date(2013, 3, 29), +new Date(2013, 3, 29, 15, 47)),
        [314, 'hour']);
    t.done();
  }
};
