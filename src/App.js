import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Greeting from './components/Greeting';
import {Header} from './components/Header';
import { Redirect } from 'react-router'
class App extends Component {

  render() {
 
    return (   
      <div className="body">
    <Redirect to="/user"/>
     <Header />
     <Main />
     <Greeting/>
  
      </div>
    );
  }
}

export default App;
