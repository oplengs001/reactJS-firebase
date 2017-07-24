import React, {Component} from 'react';
import firebase from 'firebase';
import reactfire from 'reactfire';
//--------------------------------


class Client extends Component {
  constructor(props){
  super(props)
    this.state = {
   days: [{
     monday:{
       name: "",
       slots: {

       }
     },
     tuesday:{
       name: "",
       slots: {

       }
     },
     wednesday:{
       name: "",
       slots: {

       }
     }
    } ]
       }

  }
componentWillMount(){
  //ES6 foreach()
    this.firebaseRef =firebase.database().ref('days');
    this.firebaseRef.on('value', function(dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        items.push(item);
      }.bind(this));
      this.setState({
        days: items
      });
    }.bind(this));
}
componentWillUnmount() {
    this.firebaseRef.off();
};
pushToFirebase(){

    this.firebaseRef.push({
      days:{
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
              100: {
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
              100: {
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
              100: {
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
      } 
        })
      this.setState({
          days:[]
      
      })
} 
   
  render(){
     console.log(this.state.days);
    return(
    <div>
   <h1> {this.state.days.map((days, index) => (
        <p key={index}> Day, {days.name} !</p>    
    )

    
    
    )}</h1>
    </div> 
   
  
  );
  }

}




export default Client
