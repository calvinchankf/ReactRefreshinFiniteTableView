import React from 'react'
import ReactDOM from 'react-dom'

// customize loading Indicators
import ReactRefreshInfiniteTableView from '../../lib/ReactRefreshInfiniteTableView.js'

export default class ExampleTableView2 extends ReactRefreshInfiniteTableView {

  constructor(props) {
    super(props)
  }

  render() {

    var cells = this.props.dataSource.map(function(item, index) {
      return <a key={index} className="list-group-item text-center">
        {item}
      </a>
    })

    return (
      // remember to invoke viewDidScroll from superclass(InfinitScrollView)
      <div className="tableView col-xs-4 col-xs-offset-2 list-group" onScroll={this.viewDidScroll}>
        {this.refreshIndicator()}
        {cells}
        {this.loadMoreIndicator()}
      </div>
    )
  }

  // customize your Refresh Indicator here
  refreshIndicator() {
    if (this.state.isRefreshing) {
      return (
        <div className="list-group-item text-center indicator">🏃...</div>
      )
    }
    return
  }

  // customize your Load-more Indicator here
  loadMoreIndicator() {
    if (this.state.isLoadingMore) {
      return (
        <div className="list-group-item text-center indicator">...🏃</div>
      )
    }
    return
  }
}
