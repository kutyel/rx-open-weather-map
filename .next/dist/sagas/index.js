'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('next/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _effects = require('redux-saga/effects');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(getTemperatures),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(watchTemperatures),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(main);

var getWeather = function getWeather(id) {
  return 'http://api.openweathermap.org/data/2.5/weather?id=' + id + '&units=metric&APPID=4378ebdc6e77059597b81a189b7d2cae';
};

var delay = function delay(millis) {
  return new _promise2.default(function (res) {
    return setTimeout(function () {
      return res(true);
    }, millis);
  });
};

// Fetch data every 3 mins (180.000 milliseconds)
function getTemperatures() {
  var cities, responses, temps;
  return _regenerator2.default.wrap(function getTemperatures$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(delay, 180000);

        case 3:
          _context.next = 5;
          return (0, _effects.select)(function (state) {
            return state.cities;
          });

        case 5:
          cities = _context.sent;
          _context.next = 8;
          return (0, _effects.all)(cities.map(function (_ref) {
            var id = _ref.id;
            return (0, _effects.call)(fetch, getWeather(id));
          }));

        case 8:
          responses = _context.sent;
          _context.next = 11;
          return (0, _effects.all)(responses.map(function (res) {
            return res.json();
          }));

        case 11:
          temps = _context.sent;
          _context.next = 14;
          return (0, _effects.all)(temps.map(function (city, index) {
            return (0, _effects.put)((0, _actions.update)(index, city.main.temp));
          }));

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context['catch'](0);
          return _context.abrupt('return', console.error(_context.t0));

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 16]]);
}

function watchTemperatures() {
  return _regenerator2.default.wrap(function watchTemperatures$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)('UPDATE_TEMPERATURE', getTemperatures);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function main() {
  return _regenerator2.default.wrap(function main$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.fork)(watchTemperatures);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}