"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res) {
  if (!req.session.passport.user._doc._id.equals(req.params._id)) {
    return res.status(401).json({
      error: "Unatuhorized"
    });
  }
};

exports["default"] = _default;