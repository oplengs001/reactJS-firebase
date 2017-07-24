import React, {Component} from 'react';
import firebase from 'firebase';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import '../App.css';
import Snackbar from 'material-ui/Snackbar';
//--------------------------------


class Client extends Component {
  constructor(props){
  super(props)
    this.state = {
   days: [], 
   userRef :undefined,
   open: false,
   message: "",
       }
  this.timer = undefined;

this.handleInputChange = this.handleInputChange.bind(this);}

componentDidMount(){

        const listRef = firebase.database().ref('presence/');

                this.state.userRef =  listRef.push();
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
                    let items = [];
                    dataSnapshot.forEach(childSnapshot =>
                {
                    let item = childSnapshot.val();
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
         clearTimeout(this.timer);
};
handleInputChange(event){
        const target = event.target;
        const name = target.name;
        let arr = name.split(",");
        let dayname = arr[0].toLowerCase() ,day = arr[1], slot = arr[2] ,time = arr[3];
        this.setState({
            open:true,
            message: "You request to meet on " +arr[0]+ " at " +time  })
        this.timer = setTimeout(() => {
        this.setState({
        message: `Wait for the Admin to Accept your Request`,
            });
            }, 3000);    




        this.firebaseRef.child(dayname).child('slots').child(slot).update({ booked: 'Pending' });
}
Avalability(value){   
  switch(value) {
    case true:
        return "Booked";
    case false:
        return "Available";
    case "Pending":
        return "Pending";
    default:    
}
}
CssAvalability(value){
  switch(value) {
    case true:
        return "Booked"
    case false:
        return "Available"
    case "Pending":
        return "Pending"   
    default:    
}
}
ButtonAvailability(value){
  switch(value) {
    case true:
        return true;
    case false:
        return false;
    case "Pending":
        return true;
    default:    
  }
}
 handleTouchTap = () => {
    this.setState({
      open: false,
    });
  };
render(){

              
    const body =    this.state.days.map((days, index) =>
                     Object.keys(days.slots).map((slots, id) => {
                     return   (                                                   
                        <TableRow className ={this.CssAvalability(days.slots[slots].booked)} >
                        <TableRowColumn>                           
                         <Checkbox
                         className ="checkBox"
                         label={this.Avalability(days.slots[slots].booked)}
                         disabled ={this.ButtonAvailability(days.slots[slots].booked)}
                         name={""+days.name+","+index+","+slots+","+days.slots[slots].time} 
                         checked ={this.ButtonAvailability(days.slots[slots].booked)}
                         onCheck={this.handleInputChange} 
                            />
                              
                        </TableRowColumn>
                <TableRowColumn><spanss>{days.slots[slots].time}</spanss></TableRowColumn>
                <TableRowColumn><span>{days.name}</span></TableRowColumn>    
                        </TableRow>
                             
                     )

                      } ))             
     return(
        <div>
        <center>
            <div>
                    <Table className ="tableDesign" multiSelectable = {true}>
                    <TableHeader displaySelectAll ={false} enableSelectAll={false}>
                    <TableRow className = "trDesign">
                        <TableHeaderColumn>Status</TableHeaderColumn>                         
                        <TableHeaderColumn><spans>Time</spans></TableHeaderColumn>
                        <TableHeaderColumn><span>Day</span></TableHeaderColumn>   
                    </TableRow>
                    </TableHeader>
                   <TableBody showRowHover = {true} displayRowCheckbox={false} deselectOnClickaway ={false}> 
                    {body}
                        
                 </TableBody>
                    </Table>
            </div>

        </center>
                    <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="Confirm"
                    autoHideDuration={4000}
                    onActionTouchTap={this.handleTouchTap}
                    onRequestClose={this.handleTouchTap}
                />
       </div> 
       
  );
  }

}




export default Client
