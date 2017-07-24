import React, { Component } from 'react';
import firebase from 'firebase';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';



class Acceptor extends Component {
        constructor(props){
        super(props)
            this.state = {days: [] 

            }               
            this.pushToFirebase = this.pushToFirebase.bind(this);
            
  }    
componentDidMount(){
        // const listRef = firebase.database().ref('presence/');
        this.firebaseRef = firebase.database().ref('days');
        this.firebaseRef.on('value', dataSnapshot =>{
        var items = [];
        dataSnapshot.forEach( childSnapshot => {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
        })
              this.setState({
              days: items
              });
        })
  
}
pushToFirebase(){

        this.firebaseRef.set({
            monday: {
              name: 'Monday',
              slots: {
                9: {
                  time: '9:00am',
                  booked: false
                },
                110: {
                  time: '11:00am',
                  booked: false
                },
                111: {
                  time: '1:00pm',
                  booked: false
                },
                300: {
                  time: '3:00pm',
                  booked: false
                },
                500: {
                  time: '5:00pm',
                  booked: false
                },
                700: {
                  time: '7:00pm',
                  booked: false
                }
              }
            },tuesday: {
              name: 'Tuesday',
              slots: {
                9: {
                  time: '9:00am',
                  booked: false
                },
                110: {
                  time: '11:00am',
                  booked: false
                },
                111: {
                  time: '1:00pm',
                  booked: false
                },
                300: {
                  time: '3:00pm',
                  booked: false
                },
                500: {
                  time: '5:00pm',
                  booked: false
                },
                700: {
                  time: '7:00pm',
                  booked: false
                }
              }
            },
            wednesday: {
              name: 'Wednesday',
              slots: {
                9: {
                  time: '9:00am',
                  booked: false
                },
                110: {
                  time: '11:00am',
                  booked: false
                },
                111: {
                  time: '1:00pm',
                  booked: false
                },
                300: {
                  time: '3:00pm',
                  booked: false
                },
                500: {
                  time: '5:00pm',
                  booked: false
                },
                700: {
                  time: '7:00pm',
                  booked: false
                }
              }
            }
          })



} 

componentWillUnmount() {
   
    this.firebaseRef.off();
};

Avalability(value){
  switch(value) {
    case true:
        return "BOOKED";
    case false:
        return "Available";
    case "Pending":
        return "Pending";
    default:    
}
}
ButtonAvailability(value){
  switch(value) {
    case true:
        return true;
    case false:
        return true;
    case "Pending":
        return false;
    default:    
  }
}
decide(value,dayname,slot){
//  value == 0 ? reject : approve;
value === "approve"?
this.firebaseRef.child(dayname.toLowerCase()).child('slots').child(slot).update({ booked: true })
:
this.firebaseRef.child(dayname.toLowerCase()).child('slots').child(slot).update({ booked: false });



}

  render(){ 
    
const button =   <button onClick = {this.pushToFirebase}>reset</button>
const days =     this.state.days.map((days, index) =>
                 <div key = {index}> {days.name} </div>)

const times =    this.state.days.map((days, index) =>
                 Object.keys(days.slots).map((slots, id) => {
                return(
                  
                <div>
                <label>
                      <span>
                      {this.Avalability(days.slots[slots].booked)}
                      {days.slots[slots].time}
                      </span>
                </label>  
                       <IconMenu id = {id}
                        iconButtonElement={
                        <IconButton>
                        <RaisedButton onTouchTap={this.handleOpenMenu} 
                        label={this.Avalability(days.slots[slots].booked)}
                        disabled = {this.ButtonAvailability(days.slots[slots].booked)}
                         /> {days.slots[slots].time} </IconButton>}
                        open={this.onClick}
                        onRequestChange={this.handleOnRequestChange}
                      >
                      <MenuItem value="1" primaryText="Reject" onClick = {() => this.decide("reject",days.name,slots)} />
                      <MenuItem value="2" primaryText="Approve" onClick = {() => this.decide("approve",days.name,slots)}/>  
                      </IconMenu>
                </div>              
                 )
                 }))
            
     return(
   <div>{days}
            <div>     
               <label>{times}</label>
               {button}
            </div>
   </div> 
   
  
  );
  }

}

export default Acceptor;
