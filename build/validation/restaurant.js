"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateRestaurantSearchString = exports.ValidateRestaurantCity = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidateRestaurantCity = function ValidateRestaurantCity(restaurantObject) {
  var Schema = _joi["default"].object({
    city: (0, _joi["default"])().string().required()
  });

  return Schema.validateAsync(restaurantObject);
};

exports.ValidateRestaurantCity = ValidateRestaurantCity;

var ValidateRestaurantSearchString = function ValidateRestaurantSearchString(restaurantObject) {
  var Schema = _joi["default"].object({
    searchString: _joi["default"].string().required()
  });

  return Schema.validateAsync(restaurantObject);
};

exports.ValidateRestaurantSearchString = ValidateRestaurantSearchString;