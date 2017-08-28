'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('next/node_modules/babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      index = _ref.index,
      temp = _ref.temp;

  switch (type) {
    case 'UPDATE_TEMPERATURE':
      var city = state[index] || {};
      return [].concat((0, _toConsumableArray3.default)(state.slice(0, index)), [(0, _extends3.default)({}, city, {
        history: [].concat((0, _toConsumableArray3.default)(city.history), [city.temp]),
        temp: temp
      })], (0, _toConsumableArray3.default)(state.slice(index + 1)));
    default:
      return state;
  }
};