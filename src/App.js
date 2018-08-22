import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterCard from './RegisterCard'

class App extends Component {
  render() {
    return (
      <div className="App" style = {{marginTop: 150}}>
        <img style = {{width: 200, height: 200}}src= { require('./TBike.png') } alt="Italian Trulli"/>
        <div style = {{margin:'0 auto', display: "table"}}>
          <RegisterCard/>
        </div>
      </div>
    );
  }
}

export default App;
