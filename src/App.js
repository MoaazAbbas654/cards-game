import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import "./App.css";
import Deck from "./Deck";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Deck />
      </div>
    );
  }
}

export default App;
