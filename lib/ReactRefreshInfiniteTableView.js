import React from 'react'
import ReactDOM from 'react-dom'
import './spinner.css'

export default class ReactRefreshInfiniteTableView extends React.Component {

  constructor(props) {
    super(props)
    this.viewDidScroll = this.viewDidScroll.bind(this)
    this.state = {
      isRefreshing : false,
      isLoadingMore : false
    }
  }

  render() {
    // override this to render your own components
    return (
      <div/>
    )
  }

  findNodeIndex(dom) {
    var targetNodeIndex = 0
    var nodes = document.getElementsByClassName(dom.className)
    for (var i=0; i< nodes.length; i++) {
      if (nodes[i]==dom) {
        targetNodeIndex = i
        break
      }
    }
    return targetNodeIndex
  }

  viewDidScroll(event) {

    var dom = ReactDOM.findDOMNode(this)

    // vars for UI
    var tableViewIdName = dom.id
    var tableViewClassName = dom.className
    var targetNodeIndex = this.findNodeIndex(dom) // the index of target node within the nodes with same className
    var isFindNodeById = tableViewIdName ? true : false // prefer use id becox less calculation
    var indicatorClassName = "infinit-table-spinner"

    // vars for calculation
    var scrollviewOffsetY = dom.scrollTop
    var scrollviewFrameHeight = dom.clientHeight
    var scrollviewContentHeight = dom.scrollHeight
    var sum = scrollviewOffsetY+scrollviewFrameHeight

    if (sum <= scrollviewFrameHeight) {

      // disable scroll to top if onScrollToTop isn't set
      if (!this.props.onScrollToTop) { return }

      // console.log('ReactRefreshInfiniteTableView onScrollToTop')

      if (this.state.isRefreshing) { return }
      this.setState({isRefreshing: true})

      // use default refresh indicator
      if (this.props.useDefaultIndicator) {
        // spinner for refreshing
        var refreshIndicator = document.createElement("div")
        refreshIndicator.className = indicatorClassName

        var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex]
        tableView.insertBefore(refreshIndicator, tableView.firstChild)
      }

      // event
      this.props.onScrollToTop(function() {

        this.setState({isRefreshing: false})

        if (this.props.useDefaultIndicator) {
          var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex]
          var firstChild = tableView.firstChild
          if (firstChild.className.indexOf(indicatorClassName) > -1) {
            tableView.removeChild(firstChild)
          }
        }

      }.bind(this))

    } else if (sum >= scrollviewContentHeight) {

      // disable scroll to top if onScrollToTop isn't set
      if (!this.props.onScrollToBottom) { return }

      // console.log('ReactRefreshInfiniteTableView onScrollToBottom');

      if (this.state.isLoadingMore) { return }
      this.setState({isLoadingMore: true})

      // use default load more indicator
      if (this.props.useDefaultIndicator) {
        // spinner for loading more
        var loadMoreIndicator = document.createElement("div")
        loadMoreIndicator.className = indicatorClassName

        var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex]
        tableView.insertBefore(loadMoreIndicator, tableView.lastChild.nextSibling)
      }

      // event
      this.props.onScrollToBottom(function() {

        this.setState({isLoadingMore: false})

        if (this.props.useDefaultIndicator) {
          var tableView = isFindNodeById ? document.getElementById(tableViewIdName) : document.getElementsByClassName(tableViewClassName)[targetNodeIndex]
          var lastChild = tableView.lastChild
          if (lastChild.className.indexOf(indicatorClassName) > -1) {
            tableView.removeChild(lastChild)
          }
        }

      }.bind(this))
    }

  }
}

ReactRefreshInfiniteTableView.defaultProps = {
  useDefaultIndicator: true
}
