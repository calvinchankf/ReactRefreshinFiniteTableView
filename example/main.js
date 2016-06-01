import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

import Home from './routes/Home.js'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
  </Router>
), document.getElementById('root'))
