import React, {Component} from 'react';
import firebase from 'firebase';
//--------------------------------


class Client extends Component {
  constructor(props){
  super(props)
    this.state = {
   days: [], 
   userRef:""
       }
this.handleInputChange = this.handleInputChange.bind(this);

  }

componentDidMount(){

        const listRef = firebase.database().ref('presence/');

                this.state.userRef = listRef.push();
                const presenceRef = firebase.database().ref('.info/connected');
                presenceRef.on("value", snap =>
                {
                    if (snap.val()) {
                    this.state.userRef.set(true);
                    this.state.userRef.onDisconnect().remove();   // Remove ourselves when we disconnect.
                }});

                    this.firebaseRef = firebase.database().ref('days');
                    this.firebaseRef.on('value', dataSnapshot=>
                {
                    var items = [];
                    dataSnapshot.forEach(childSnapshot =>
                {
                    var item = childSnapshot.val();
                    item['.key'] = childSnapshot.key;
                    items.push(item);
                })
                        this.setState({
                        days: items
                        });
                })
                }

componentWillUnmount() {
        this.firebaseRef.off();
        this.state.userRef.remove();
};
handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const arr = name.split(",");
        var dayname = arr[0].toLowerCase() ,day = arr[1], slot = arr[2];
        console.log(dayname+ " " + day + " " + slot)
        this.firebaseRef.child(dayname).child('slots').child(slot).update({ booked: 'Pending' });
}
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
  render(){


    const days =     this.state.days.map((days, index) =>
                    <div key = {index}> {days.name} </div>)

    const times =    this.state.days.map((days, index) =>
                     Object.keys(days.slots).map((slots, id) => {
                     return <div>          
                    <input type="checkbox" name={[days.name,index,slots]}  checked ={days.slots[slots].booked} onChange={this.handleInputChange} ></input>
                    <label><span>{this.Avalability(days.slots[slots].booked)} {days.slots[slots].time} </span> </label>
                    </div>
                      } ))             
     return(
        <div>{days}
            <div>
               <label>{times}</label>
            </div>
       </div> 
  );
  }

}




export default Client
