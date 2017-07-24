import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {Header} from './components/Header';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {
  constructor() {
  super()
  this.state = {
  open: true,
  };
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (   
      <div className="App">
     <Header />
     <Main />
      <div>
              <Dialog
              title="ReactJS and Firebase"
              actions={ <FlatButton
              label="OK"
              primary={true}
              onTouchTap={this.handleClose}
              />}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              Welcome Scheduler With ReactJS and Firebase
              </Dialog>
      </div>
      </div>
    );
  }
}

export default App;
