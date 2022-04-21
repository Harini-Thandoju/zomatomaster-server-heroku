"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _allModels = require("../../database/allModels");

var _validateUser = _interopRequireDefault(require("../../config/validateUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Router = _express["default"].Router();
/**
 * Route        /
 * Des          GET all orders based on id
 * Params       _id
 * Access       Private
 * Method       GET
 */


Router.get("/:_id", _passport["default"].authenticate("jwt"), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _id, getOrders;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _validateUser["default"])(req, res);

          case 3:
            _id = req.params._id;
            _context.next = 6;
            return _allModels.OrderModel.findOne({
              user: _id
            });

          case 6:
            getOrders = _context.sent;

            if (getOrders) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "User not found"
            }));

          case 9:
            return _context.abrupt("return", res.status(200).json({
              orders: getOrders
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0.message
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * Route        /new/:_id
 * Des          Add new order
 * Params       _id
 * Access       Private
 * Method       POST or PUT
 */

Router.post("/new/:_id", _passport["default"].authenticate("jwt"), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _id, orderDetails, addNewOrder;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _id = req.params._id;
            orderDetails = req.body.orderDetails;
            _context2.next = 5;
            return _allModels.OrderModel.findOneAndUpdate({
              user: _id
            }, {
              $push: {
                orderDetails: orderDetails
              }
            }, {
              "new": true
            });

          case 5:
            addNewOrder = _context2.sent;
            return _context2.abrupt("return", res.json({
              order: addNewOrder
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0.message
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = Router;
exports["default"] = _default;