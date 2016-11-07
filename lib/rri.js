'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./spinner.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRefreshInfiniteTableView = function (_React$Component) {
  _inherits(ReactRefreshInfiniteTableView, _React$Component);

  function ReactRefreshInfiniteTableView(props) {
    _classCallCheck(this, ReactRefreshInfiniteTableView);

    var _this = _possibleConstructorReturn(this, (ReactRefreshInfiniteTableView.__proto__ || Object.getPrototypeOf(ReactRefreshInfiniteTableView)).call(this, props));

    _this.viewDidScroll = _this.viewDidScroll.bind(_this);
    _this.state = {
      isRefreshing: false,
      isLoadingMore: false
    };
    return _this;
  }

  _createClass(ReactRefreshInfiniteTableView, [{
    key: 'render',
    value: function render() {
      // override this to render your own components
      return _react2.default.createElement('div', null);
    }
  }, {
    key: 'findNodeIndex',
    value: function findNodeIndex(dom) {
      var targetNodeIndex = 0;
      var nodes = document.getElementsByClassName(dom.className);
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] == dom) {
          targetNodeIndex = i;
          break;
        }
      }
      return targetNodeIndex;
    }
  }, {
    key: 'viewDidScroll',
    value: function viewDidScroll(event) {

      var dom = _reactDom2.default.findDOMNode(this);

      // vars for UI
      var tableViewIdName = dom.id;
      var tableViewClassName = dom.className;
      var targetNodeIndex = this.findNodeIndex(dom); // the index of target node within the nodes with same className
      var isFindNodeById = tableViewIdName ? true : false; // prefer use id becox less calculation
      var indicatorClassName = "infinit-table-spinner";

      // vars for calculation
      var scrollviewOffsetY = dom.scrollTop;
      var scrollviewFrameHeight = dom.clientHeight;
      var scrollviewContentHeight = dom.scrollHeight;
      var sum = scrollviewOffsetY + scrollviewFrameHeight;

      if (sum <= scrollviewFrameHeight) {

        // disable scroll to top if onScrollToTop isn't set
        if (!this.props.onScrollToTop) {
          return;
        }

        // console.log('ReactRefreshInfiniteTableView onScrollToTop')

        if (this.state.isRefreshing) {
          return;
        }
        this.setState({ isRefreshing: true });

        // use default refresh indicator
        if (this.props.useDefaultIndicator) {
          // spinner for refreshing
          var refreshIndicator = document.createElement("div");
          refreshIndicator.className = indicatorClassName;

          var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
          tableView.insertBefore(refreshIndicator, tableView.firstChild);
        }

        // event
        this.props.onScrollToTop(function () {

          this.setState({ isRefreshing: false });

          if (this.props.useDefaultIndicator) {
            var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
            var firstChild = tableView.firstChild;
            if (firstChild.className.indexOf(indicatorClassName) > -1) {
              tableView.removeChild(firstChild);
            }
          }
        }.bind(this));
      } else if (sum >= scrollviewContentHeight) {

        // disable scroll to top if onScrollToTop isn't set
        if (!this.props.onScrollToBottom) {
          return;
        }

        // console.log('ReactRefreshInfiniteTableView onScrollToBottom');

        if (this.state.isLoadingMore) {
          return;
        }
        this.setState({ isLoadingMore: true });

        // use default load more indicator
        if (this.props.useDefaultIndicator) {
          // spinner for loading more
          var loadMoreIndicator = document.createElement("div");
          loadMoreIndicator.className = indicatorClassName;

          var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
          tableView.insertBefore(loadMoreIndicator, tableView.lastChild.nextSibling);
        }

        // event
        this.props.onScrollToBottom(function () {

          this.setState({ isLoadingMore: false });

          if (this.props.useDefaultIndicator) {
            var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
            var lastChild = tableView.lastChild;
            if (lastChild.className.indexOf(indicatorClassName) > -1) {
              tableView.removeChild(lastChild);
            }
          }
        }.bind(this));
      }
    }
  }]);

  return ReactRefreshInfiniteTableView;
}(_react2.default.Component);

exports.default = ReactRefreshInfiniteTableView;


ReactRefreshInfiniteTableView.defaultProps = {
  useDefaultIndicator: true
};
