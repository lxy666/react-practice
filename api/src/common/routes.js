import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Route } from 'react-router'
import index from 'pages/index'

const routes = (
  <HashRouter>
    <div>
      <Route path="/" component={index} />
    </div>
  </HashRouter>
)

export default routes;

