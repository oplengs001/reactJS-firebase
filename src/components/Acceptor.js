import React, { Component } from 'react';
import firebase from 'firebase';
class Acceptor extends Component {
        constructor(props){
        super(props)
            this.state = {days: []}               
            this.handleAdminChange = this.handleAdminChange.bind(this);
            this.pushToFirebase = this.pushToFirebase.bind(this);
            
  }
          
componentDidMount(){

        const listRef = firebase.database().ref('presence/');
        this.firebaseRef = firebase.database().ref('days');
        
        this.firebaseRef.on('value', function(dataSnapshot) {
        var items = [];
        dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
        }.bind(this));
              this.setState({
              days: items
              });
        }.bind(this));
  
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

handleAdminChange(event){
      const target = event.target;
      const name = target.name;
      const arr = name.split(",");
      var dayname = arr[0].toLowerCase() ,day = arr[1], slot = arr[2];
      console.log(dayname+ " " + day + " " + slot)
      var status =   this.state.days[day].slots[slot].booked
      var nbookedVal;
      nbookedVal = status == true ? false : true;
      this.firebaseRef.child(dayname).child('slots').child(slot).update({ booked: 'Pending' });
}
Avalability(value){
  switch(value) {
    case true:
        return "BOOKED";
        break;
    case false:
        return "Available";
        break;
    case "Pending":
        return "Pending";
        break;
    default:    
}
}

  render(){ 
    
const button =   <button onClick = {this.pushToFirebase}>reset</button>
const days =     this.state.days.map((days, index) =>
                 <div key = {index}> {days.name} </div>)

const times =    this.state.days.map((days, index) =>
                 Object.keys(days.slots).map((slots, id) => {
                return(
                <div>                 
                <input type="checkbox" name={[days.name,index,slots]}  checked ={days.slots[slots].booked} onChange={this.handleAdminChange} ></input>
                <label><span>{this.Avalability(days.slots[slots].booked)} {days.slots[slots].time}</span></label>
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
