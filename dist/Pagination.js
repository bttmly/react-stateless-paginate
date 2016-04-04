"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Pagination;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCreateFragment = require("react-addons-create-fragment");

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _paginate = require("./paginate");

var _paginate2 = _interopRequireDefault(_paginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Pagination(props) {
  var selected = props.initialSelected ? props.initialSelected : props.forceSelected ? props.forceSelected : 0;

  var Block = BlockFactory(props);
  var pages = (0, _paginate2.default)(props, selected).reduce(function (out, item, index) {
    out["key" + index] = Block(item);
    return out;
  }, {});

  var disabled = props.disabledClassName;
  var previousClasses = (0, _classnames2.default)(props.previousClassName, _defineProperty({}, disabled, selected === 0));
  var nextClasses = (0, _classnames2.default)(props.nextClassName, _defineProperty({}, disabled, selected === props.pageNum - 1));

  // "selected" is one less than the number displayed
  var previousHref = selected === 0 ? "#" : props.hrefPrefix + selected;
  var nextHref = selected === props.pageNum - 1 ? "#" : props.hrefPrefix + (selected + 2);

  return _react2.default.createElement(
    "ul",
    { className: props.containerClassName },
    _react2.default.createElement(
      "li",
      { className: previousClasses },
      _react2.default.createElement(
        "a",
        { href: previousHref, className: props.previousLinkClassName },
        props.previousLabel
      )
    ),
    (0, _reactAddonsCreateFragment2.default)(pages),
    _react2.default.createElement(
      "li",
      { className: nextClasses },
      _react2.default.createElement(
        "a",
        { href: nextHref, className: props.nextLinkClassName },
        props.nextLabel
      )
    )
  );
}

Pagination.propTypes = {
  pageNum: _react.PropTypes.number.isRequired,
  pageRangeDisplayed: _react.PropTypes.number.isRequired,
  marginPagesDisplayed: _react.PropTypes.number.isRequired,
  previousLabel: _react.PropTypes.node,
  nextLabel: _react.PropTypes.node,
  breakLabel: _react.PropTypes.node,
  clickCallback: _react.PropTypes.func,
  initialSelected: _react.PropTypes.number,
  forceSelected: _react.PropTypes.number,
  containerClassName: _react.PropTypes.string,
  subContainerClassName: _react.PropTypes.string,
  pageClassName: _react.PropTypes.string,
  pageLinkClassName: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string,
  previousClassName: _react.PropTypes.string,
  nextClassName: _react.PropTypes.string,
  previousLinkClassName: _react.PropTypes.string,
  nextLinkClassName: _react.PropTypes.string,
  disabledClassName: _react.PropTypes.string,
  hrefPrefix: _react.PropTypes.string
};

Pagination.defaultProps = {
  pageNum: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: "selected",
  previousClassName: "previous",
  nextClassName: "next",
  previousLabel: "Previous",
  nextLabel: "Next",
  breakLabel: "...",
  disabledClassName: "disabled",
  hrefPrefix: "/page/"
};

function BlockFactory(props) {
  return function Block(data) {
    return data.type === "page" ? _react2.default.createElement(Page, {
      selected: data.selected,
      pageClassName: props.pageClassName,
      pageLinkClassName: props.pageLinkClassName,
      activeClassName: props.activeClassName,
      page: data.page,
      linkHref: props.hrefPrefix + data.page
    }) : _react2.default.createElement(Break, { breakLabel: props.breakLabel });
  };
}

function Page(props) {
  var linkClassName = props.pageLinkClassName;
  var cssClassName = props.pageClassName;

  if (props.selected) {
    if (cssClassName != null) {
      cssClassName = cssClassName + " " + props.activeClassName;
    } else {
      cssClassName = props.activeClassName;
    }
  }

  return _react2.default.createElement(
    "li",
    { className: cssClassName },
    _react2.default.createElement(
      "a",
      { href: props.linkHref, className: linkClassName },
      props.page
    )
  );
}

function Break(props) {
  var label = props.breakLabel;
  return _react2.default.createElement(
    "li",
    { className: "break" },
    label
  );
}
//# sourceMappingURL=Pagination.js.map