"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _allModels = require("../../database/allModels");

var _s = require("../../utils/s3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Router = _express["default"].Router(); // multer config


var storage = _multer["default"].memoryStorage();

var upload = (0, _multer["default"])({
  storage: storage
}); // utility function

/**
 * Route        /
 * Des          Uploads given image to s3 bucket and saves file link to mongodb
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/", upload.single("file"), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var file, bucketOptions, uploadImage, saveImageToDatabase;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            file = req.file; // s3 bucket options

            bucketOptions = {
              Bucket: "zomato-master-project123",
              Key: file.originalname,
              Body: file.buffer,
              ContentType: file.mimetype,
              ACL: "public-read" // Access Controll List

            };
            _context.next = 5;
            return (0, _s.s3Upload)(bucketOptions);

          case 5:
            uploadImage = _context.sent;
            _context.next = 8;
            return _allModels.ImageModel.create({
              images: [{
                location: uploadImage.Location
              }]
            });

          case 8:
            saveImageToDatabase = _context.sent;
            return _context.abrupt("return", res.status(200).json(saveImageToDatabase));

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
Router.get("/:_id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _id, image;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _id = req.params._id;
            _context2.next = 4;
            return _allModels.ImageModel.findById(_id);

          case 4:
            image = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(image));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0.message
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = Router;
exports["default"] = _default;