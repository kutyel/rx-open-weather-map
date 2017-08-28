'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var update = exports.update = function update(index, temp) {
  return {
    type: 'UPDATE_TEMPERATURE',
    index: index,
    temp: temp
  };
};