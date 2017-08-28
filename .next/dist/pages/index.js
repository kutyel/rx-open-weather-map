'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _brightnessHigh = require('material-ui/svg-icons/device/brightness-high');

var _brightnessHigh2 = _interopRequireDefault(_brightnessHigh);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _reactSimpleMaps = require('react-simple-maps');

var _actions = require('../actions');

var _store = require('../store');

var _countries = require('../data/countries');

var _countries2 = _interopRequireDefault(_countries);

var _scale = require('../other/scale');

var _styles = require('../other/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map = function (_React$Component) {
  (0, _inherits3.default)(Map, _React$Component);

  function Map() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Map);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Map.__proto__ || (0, _getPrototypeOf2.default)(Map)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return _react2.default.createElement(_MuiThemeProvider2.default, null, _react2.default.createElement('div', { style: _styles.wrapperStyles }, _react2.default.createElement(_AppBar2.default, {
        title: 'OpenWeatherMap',
        iconElementLeft: _react2.default.createElement(_IconButton2.default, null, _react2.default.createElement(_brightnessHigh2.default, null))
      }), _react2.default.createElement(_reactSimpleMaps.ComposableMap, {
        projectionConfig: { scale: 800 },
        width: 1000,
        height: 1000,
        style: {
          width: '100%',
          height: 'auto'
        }
      }, _react2.default.createElement(_reactSimpleMaps.ZoomableGroup, { center: [-60, -25], disablePanning: true }, _react2.default.createElement(_reactSimpleMaps.Geographies, { geographyUrl: '/static/world-50m.json' }, function (geographies, projection) {
        return geographies.map(function (geography, i) {
          return _countries2.default.includes(geography.id) && _react2.default.createElement(_reactSimpleMaps.Geography, {
            key: i,
            geography: geography,
            projection: projection,
            style: _styles.mapStyles
          });
        });
      }), _react2.default.createElement(_reactSimpleMaps.Markers, null, (_this.props.cities || []).map(function (city, i) {
        return _react2.default.createElement(_reactSimpleMaps.Marker, {
          key: i,
          marker: city,
          style: {
            default: { fill: (0, _scale.popScale)(city.temp) },
            hover: { fill: (0, _scale.popScale)(city.temp) },
            pressed: { fill: (0, _scale.popScale)(city.temp) }
          }
        }, _react2.default.createElement('circle', { cx: 0, cy: 0, r: 20 }), _react2.default.createElement('text', { textAnchor: 'middle', y: city.offset, style: _styles.textStyle }, city.name, ' (', city.temp, ' \xBAC)'));
      }))))));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Map, null, [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref2) {
      var store = _ref2.store;

      // Initial dispatch
      store.dispatch((0, _actions.update)(0, 10));
      return (0, _extends3.default)({}, store.getState());
    }
  }]);

  return Map;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref3) {
  var cities = _ref3.cities;
  return { cities: cities };
};

exports.default = (0, _nextReduxWrapper2.default)(_store.initStore, mapStateToProps)(Map);