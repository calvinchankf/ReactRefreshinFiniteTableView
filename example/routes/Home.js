import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../app.css'

import ExampleTableView1 from './ExampleTableView1.js'
import ExampleTableView2 from './ExampleTableView2.js'

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    // initial data for tableviews
    var data1 = this.initData()
    var data2 = this.initData()
    this.state = {data1: data1, data2: data2}

    // recommend that you bind your event handlers in the constructor so they are only bound once for every instance
    // https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
    this.handleScrollToTop1 = this.handleScrollToTop1.bind(this)
    this.handleScrollToBottom1 = this.handleScrollToBottom1.bind(this)

    this.handleScrollToTop2 = this.handleScrollToTop2.bind(this)
    this.handleScrollToBottom2 = this.handleScrollToBottom2.bind(this)
  }

  render() {
    return (
      <div>
        <div>
          <div className="col-xs-4 col-xs-offset-1 text-center title">Default</div>
          <div className="col-xs-4 col-xs-offset-2 text-center title">Custom</div>
        </div>
        <div>
          <ExampleTableView1
            dataSource={this.state.data1}
            onScrollToTop={this.handleScrollToTop1}
            onScrollToBottom={this.handleScrollToBottom1}
          />
          <ExampleTableView2
            dataSource={this.state.data2}
            useDefaultIndicator={false}
            onScrollToTop={this.handleScrollToTop2}
            onScrollToBottom={this.handleScrollToBottom2}
          />
        </div>
      </div>
    )
  }

  initData() {
    var data = []
    for (var i=0; i<20; i++) {
      data.push(i)
    }
    return data
  }

  moreData(oldData) {
    var newData = Object.assign([], oldData)
    var base = newData[newData.length-1]
    for (var i=base+1; i<=base+20; i++) {
      newData.push(i)
    }
    return newData
  }

  // example 1
  handleScrollToTop1(completed) {
    // refresh
    setTimeout(function() {
      var data = this.initData()
      console.log(data)

      // completed is a callback to tell infinite table to hide loading indicator
      // must invcke completed before setState
      completed()
      this.setState({data1: data})

    }.bind(this), 1000)
  }

  handleScrollToBottom1(completed) {
    // load more
    setTimeout(function() {
      var newData = this.moreData(this.state.data1)
      console.log(newData)

      completed()
      this.setState({data1: newData})

    }.bind(this), 1000)
  }

  // example 2
  handleScrollToTop2(completed) {
    // refresh
    setTimeout(function() {
      var data = this.initData()
      console.log(data)

      completed()
      this.setState({data2: data})

    }.bind(this), 1000)
  }

  handleScrollToBottom2(completed) {
    // load more
    setTimeout(function() {
      var newData = this.moreData(this.state.data2)
      console.log(newData)

      completed()
      this.setState({data2: newData})

    }.bind(this), 1000)
  }
}
