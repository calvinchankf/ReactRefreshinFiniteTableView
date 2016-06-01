import React from 'react'
import ReactDOM from 'react-dom'

// use default loading spinners
import ReactRefreshInfiniteTableView from '../../lib/ReactRefreshInfiniteTableView.js'

export default class ExampleTableView1 extends ReactRefreshInfiniteTableView {

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
      <div className="tableView col-xs-4 col-xs-offset-1 list-group" onScroll={this.viewDidScroll}>
        {cells}
      </div>
    )
  }

}
