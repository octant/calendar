import React, { Component } from "react";
import "./App.css";

import Calendar from "./calendar/Calendar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Calendar</h1>
        <div className="App-content">
          <Calendar date="2018-02-22" />
        </div>
      </div>
    );
  }
}

export default App;
