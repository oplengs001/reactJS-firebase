import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import { BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
firebase.initializeApp({
        apiKey: "AIzaSyDJ9bzmeTXdh98fSTM8SO7T3ItXrddGn44",
        authDomain: "490000163888-5k792op5njc7i6o323rl9oda5sre5g6n.apps.googleusercontent.com",
        databaseURL: "https://scheduler-4d462.firebaseio.com/"
      })

ReactDOM.render(
<BrowserRouter >
<MuiThemeProvider>
    <App />
      </MuiThemeProvider>   
</BrowserRouter >
    , document.getElementById('root'));

registerServiceWorker();
