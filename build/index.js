"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parser = require("@babel/parser");

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var t = _interopRequireWildcard(require("@babel/types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parser =
/*#__PURE__*/
function () {
  function Parser(code) {
    _classCallCheck(this, Parser);

    this.code = code;
    return this.init();
  }

  _createClass(Parser, [{
    key: "init",
    value: function init() {
      var code = (0, _parser.parse)(this.code, {
        sourceType: 'module',
        plugins: ['jsx']
      });
      var foundComponents = [];
      (0, _traverse.default)(code, {
        ImportDeclaration: function ImportDeclaration(path) {
          var node = path.node;
          var regex = /((\.{2}\/)+\w.*|\.\/+\w.+)/g;
          var isRelative = node.source.value.match(regex);

          if (isRelative) {
            var importSpecifierPaths = path.get('specifiers');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = importSpecifierPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var importSpecifierPath = _step.value;
                var _node = importSpecifierPath.node;
                var id = _node.local;

                if (id.name.charAt(0) === id.name.toUpperCase().charAt(0)) {
                  foundComponents.push(id.name);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }
      });
      return foundComponents;
    }
  }]);

  return Parser;
}();

var _default = function _default(code) {
  return new Parser(code);
};

exports.default = _default;