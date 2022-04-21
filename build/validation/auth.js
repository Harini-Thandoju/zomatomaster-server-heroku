"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateSignup = exports.ValidateSignin = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidateSignup = function ValidateSignup(userData) {
  var Schema = _joi["default"].object({
    fullName: _joi["default"].string().required().min(5),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string(),
    address: _joi["default"].array().items(_joi["default"].object({
      details: _joi["default"].string(),
      "for": _joi["default"].string()
    })),
    phoneNumber: _joi["default"].number()
  });

  return Schema.validateAsync(userData);
};

exports.ValidateSignup = ValidateSignup;

var ValidateSignin = function ValidateSignin(userData) {
  var Schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  });

  return Schema.validateAsync(userData);
};

exports.ValidateSignin = ValidateSignin;