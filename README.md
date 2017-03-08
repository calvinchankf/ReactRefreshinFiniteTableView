## Thank you guys so much for all your support. The project has been discontinued. Instead, I will make another one with better performance on both desktop and mobile

# React-Refresh-Infinite-TableView

[![npm version](https://img.shields.io/npm/v/react-refresh-infinite-tableview.svg?style=flat-square)](https://www.npmjs.com/package/react-refresh-infinite-tableview)
[![npm downloads](https://img.shields.io/npm/dm/react-refresh-infinite-tableview.svg?style=flat-square)](https://www.npmjs.com/package/react-refresh-infinite-tableview)
___

![demo](demo.gif)

### Features 👀

- Pull to Refresh
- Pull to Load More
- Fully Customizable Loading Indicator
- Subclass-able React Component

### How to Install 😍?

0. via npm install
```
npm install --save react-refresh-infinite-tableview
```
1. or manually
  - extract the ```rri.js``` and ```spinner.css``` from ```lib/```, and use them in your projects.

### How to Use 🤔?
- You can use it with default spinners or your custom spinners
- Below are some setups, if you are looking for detail, please take a look at /examples

```
import ReactRefreshInfiniteTableView from 'react-refresh-infinite-tableview'
```

- Use Default Spinners

  - subclass the ```ReactRefreshInfiniteTableView```
  ```es6
  class ExampleTableView extends ReactRefreshInfiniteTableView {
    //...
  }
  ```

 - attach an scroll event listener to your scrollview
 ```es6
 <div className="tableView" onScroll={this.viewDidScroll}>
 ```
 - set props to your tableview component
 ```es6
 <ExampleTableView dataSource={this.state.data} onScrollToTop={this.handleScrollToTop} onScrollToBottom={this.handleScrollToBottom}
 />
 ```
 - handle scroll events
 ```es6
 // handle onScrollToTop
 handleScrollToTop(completed) {
   // refresh data
   // ...

   // once received data
   completed()
   this.setState({data: newData})
 }
 
 // handle onScrollToBottom
 handleScrollToBottom(completed) {
   // load more data
   // ...

   // once received data
   completed()
   this.setState({data1: newData})
 }
 ```
 - see ExampleTableView1 for details

- Use your own loading indicators
  - first, you need to follow the basic set up as the above(use default spinner)
  - set useDefaultIndicator to false for your component
  ```es6
  useDefaultIndicator={false}
  ```
  - construct your own indicators with jsx
  ```es6
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
  ```
  - render your indicators with your tableview
  ```es6
  <div className="tableView" onScroll={this.viewDidScroll}>
    {this.refreshIndicator()}
    {cells}
    {this.loadMoreIndicator()}
  </div>
  ```
  - see ExampleTableView2 for details

- You can also disable the scrollToTop or scrollToBottom by just by just not setting the props.
```es6
<ExampleTableView dataSource={this.state.data} onScrollToBottom={this.handleScrollToBottom} />
```

### TODO:

- Customizable default spinner
- Trigger scroll-to-top event when pull down if the tableview is already at the top

### Demo 😮

- Run the demo with
```
npm install
npm start
```
then go to http://localhost:3000/

- P.S. In the demo, you may notice that the page will auto-refresh after you change the code because the demo is based on my another repo [React-SPA-Starter](https://github.com/calvinchankf/React-SPA-Starter), which is a very handy starter-kit for react dev.
