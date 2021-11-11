import React from 'react'
import Home from './Home'
import Payment from './Payment'
import {
    Switch,
    Route
  } from "react-router-dom";

function Routes() {
    return (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path='/card'>
            <Payment />
          </Route>    
          <Route path='/*'>
            <div> Path not found</div>
          </Route>
        </Switch>
    )   
}

export default Routes