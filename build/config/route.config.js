"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _allModels = require("../database/allModels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JWTStrategy = _passportJwt["default"].Strategy;
var ExtractJwt = _passportJwt["default"].ExtractJwt;
var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoAPP"
};

var _default = function _default(passport) {
  passport.use(new JWTStrategy(options, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(jwt__payload, done) {
      var doesUserExist;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _allModels.UserModel.findById(jwt__payload.user);

            case 3:
              doesUserExist = _context.sent;

              if (doesUserExist) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", done(null, false));

            case 6:
              return _context.abrupt("return", done(null, doesUserExist));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              throw new Error(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));
}; // Explanation
// const req = {
//     headers: {
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjE5NTIxODRkOWIwZjQ2ZTI0MDFhNTdiIiwiaWF0IjoxNjM3NzY3MTEyfQ.8BHsAcNZe_zuT-4pcqaZE63YmH3F_MfMobdGblzyTxQ"
//     }
// }
// will be converted to
// const req = {
//     headers: {
//         Authorization: "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjE5NTIxODRkOWIwZjQ2ZTI0MDFhNTdiIiwiaWF0IjoxNjM3NzY3MTEyfQ.8BHsAcNZe_zuT-4pcqaZE63YmH3F_MfMobdGblzyTxQ"
//     }
// }
// const jwt__payload = {
//     user: sfasf3423szdfa34324
// }


exports["default"] = _default;