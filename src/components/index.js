// External Dependencies
import React, { Component } from 'react';

require('../index.css');
// Our Dependencies
import { capitalize } from '../utils/helpers'

// Components
import Calendar from './Calendar';
//require moment
const moment = require('moment');

export default  class App extends Component {


  render() {
    const mealOrders = ['breakfast', 'lunch', 'dinner'];
    const showDate = moment(this.props.startDate).format('dddd, MMMM Do');
    return (

        <div>
        
        <nav className = "grey">
          <div className="nav-wrapper container">
            <a href="/" className="brand-logo"><img src='images/ironmeals.png'></img></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/dashboard">My Dashboard</a></li>
              <li className='active'><a href="#">My Plan</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        </nav>


        <div className='row'>
        <div className='col s12'>
          <div className='app-wrapper'>

            
            <h4 id='plan-date' className='center-align'>My meals for the week starting {showDate}</h4>
            
            <div className='row'>
              <div className='col s12'>
                <div className='center-align'>
                 
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      
        <div className="nav">
          <h1 className="header">Iron Meals for this week</h1>
        </div>
        <ul>
          { mealOrders.map(meal => (
            <li key={meal} className="subheader">
              {capitalize(meal)}
            </li>
          ))}
        </ul>
        <Calendar 
          mealOrders={mealOrders} 
        />
      </div>
    )
  }
}


