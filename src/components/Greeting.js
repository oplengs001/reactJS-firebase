import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
class Greeting extends Component {
  constructor() {
  super()
  this.state = {
  open: true,
  loading: false,
  finished: false,
  stepIndex: 0,
  };
  }
  handleClose = () => {
    this.setState({open: false});
  };

dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        <div>
           This is an Example of Using ReactJS with Firebase
          The following are the important modules used in completing this exercise:
				<ul>
					<li>ReactJS and Firebase</li>
					<li>React-router-dom</li>
					<li>Webpack bundler and babel</li>
					<li>And Material-UI</li>                 				
				</ul> 
				This will measure my designing skills and speed in coping and utilizing available dependencies
        </div>
        );
      case 1:
        return (   
               <div>
             This exercise is inspired in Material and Minimal Designs
        Updated features are:
				<ul>
					<li>Minimal User Prompt on Request</li>
					<li>Minimal Admin Prompt on Reject and Accept</li>
					<li>Admin Online Users Count Notification</li>
					<li>Tabular design for future large data</li>                 				
				</ul>
           new features are available throught out the app
				
           </div>
   
        );
      case 2:
        return (
            <div>
        
             This exercise is documented in github by branches to explained the development process
          This Branches are included in <a href="https://github.com/oplengs001/reactJS-firebase" >reactJS-firebase</a>:
				<ul>
					<li>startup-routing</li>
					<li>firebase-connect-plus-webpackbuild</li>
					<li>app-basic-functions</li>
					<li>update-user-interface</li>
                    <li>final-commit-build-and-polishing-interface</li>                      				
				</ul> 
            only large update features are committed in the github repository read branche Readme.md for more information
				
         
          </div>
        );
      default:
        return '';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="/user"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
               Just click here
            </a> if you miss anything
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;
    return (   
      <div>
      <div>
              <Dialog
              title="ReactJS and Firebase"
              actions={ <FlatButton
              label="Close"
              primary={true}
              onTouchTap={this.handleClose}
              />}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              >
              Welcome Scheduler With ReactJS and Firebase
                  <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Introduction</StepLabel>
          </Step>
          <Step>
            <StepLabel>What's New?</StepLabel>
          </Step>
          <Step>
            <StepLabel>Thank you</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
              </Dialog>
      </div>
      </div>
    );
  }
}

export default Greeting;
