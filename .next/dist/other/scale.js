'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popScale = undefined;

var _d3Scale = require('d3-scale');

var popScale = exports.popScale = (0, _d3Scale.scaleLinear)().domain([-20, -10, 0, 10, 20, 30, 40, 50, 60]).range(['#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c']);