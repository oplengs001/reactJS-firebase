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
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (   
      <div className="App">
     <Header />
     <Main />
      <div>

        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
      </div>
    );
  }
}

export default App;
