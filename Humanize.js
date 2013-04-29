// humanizer v.0.1.2
(function(_){

function Humanize(baseUnitName, baseUnit){
  if(!baseUnitName || !baseUnit){throw new Error("Humanize({String}baseUnitName, {Number}baseUnit)");}
  this._units        = [];
  this._baseUnit     = baseUnit;
  this._baseUnitName = baseUnitName;
  this._sorter       = Humanize.DEFAULT_SORTER;
  this._selector     = Humanize.DEFAULT_SELECTOR;
  this._round        = Humanize.DEFAULT_ROUND;

  this.unit(baseUnitName, baseUnit);
}

/**
 * Default round function
 * @param {Number} val
 * @return {Number}
 */
Humanize.DEFAULT_ROUND = function(val){return val;};

/**
 * From the highest unit to the lowest one
 * @param {Unit} a
 * @param {Unit} b
 */
Humanize.DEFAULT_SORTER = function(a, b){
  return a.value - b.value;
};

/**
 * [DEFAULT_SELECTOR description]
 * @param {Number} value
 * @return {Boolean} true if the value is good enough to be read by human
 */
Humanize.DEFAULT_SELECTOR = function(currentValue, unit, rawValue){
  return currentValue > 10 && currentValue < 1000;
};

/**
 * Add a Unit to match
 * @param {String} unit     unit name
 * @param {Number} value    unit value
 * @param {Function} fMatcher -> boolean, true if the current unit is valid to display.
 */
Humanize.prototype.unit = function(unit, value){
  this._units.push(_.object(['unit', 'value'], arguments));
  this._sortUnits();
  return this;
};

/**
 * Sort unit from higher to lowest
 * @return {Array} sorted array
 */
Humanize.prototype._sortUnits = function(){
  this._units = this._units.sort(this._sorter);
  return this;
};

Humanize.prototype.sortBy = function(f){
  this._sorter = f;
  this._sortUnits();
  return this;
};

Humanize.prototype.setRound = function(f){
  this._round = f;
  return this;
};

/**
 * [humanize description]
 * @param  {Number} value value in baseUnit
 * @return {[type]}       [description]
 */
Humanize.prototype.humanize = function(value, unit){
  return this._humanize(value, function(val, unitVal){return val/unitVal;}, unit);
};

/**
 * [humanizeRange description]
 * @param  {Number} value valie in baseUnit
 * @param  {Number} start start value in baseUnit
 * @param  {Number} end   end value in baseUnit
 * @param  {None|String} unit  preferred output unit name
 * @optional
 * @return {Array}       [roundedValue, unit]
 */
Humanize.prototype.humanizeRange = function(value, start, end, unit){
  return this._humanize(value / (Math.max(start, end) - Math.min(start, end)), function(val, unitVal){
    return val*unitVal;
  }, unit);
};

Humanize.prototype._humanize = function(value, f, _unit){
  var unit, val;

  for(var i = 0, l = this._units.length; i < l; i++){
    unit = this._units[i];
    val = f(value, unit.value);
    if((!_unit && this._selector(val, unit, value)) || unit.unit === _unit){
      return [this._round(val), unit.unit];
    }
  }

  return [this._round(value), this._baseUnitName];
};

if ('undefined' !== typeof module && module.exports) {
  module.exports = Humanize;
} else {
  this.Humanize = Humanize;
}
}('undefined' !== typeof module && module.exports ? require('lodash') : _));
