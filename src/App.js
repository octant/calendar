import React, { Component } from 'react'
import './App.css'

import Calendar from './calendar/Calendar'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>Calendar</h1>
        <div className='App-content'>
          <Calendar rangeSelect />
        </div>
      </div>
    )
  }
}

export default App
