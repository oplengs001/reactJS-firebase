import React, { Component } from 'react';
import firebase from 'firebase';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
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
        let items = [];
        dataSnapshot.forEach( childSnapshot => {
        let item = childSnapshot.val();
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
        return "Booked";
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

decide(value,dayname,slot){
//  value == 0 ? reject : approve;
    const approve  = () => this.firebaseRef.child(dayname.toLowerCase()).child('slots').child(slot).update({ booked: true })
    const reject  = () => this.firebaseRef.child(dayname.toLowerCase()).child('slots').child(slot).update({ booked: false });
    value === "approve"?
    approve()
    :
    reject()



}

  render(){ 
    
const button =   <button onClick = {this.pushToFirebase}>reset</button>

const body =    this.state.days.map((days, index) =>
                 Object.keys(days.slots).map((slots, id) => {
                 return(
                  
           <TableRow className ={this.CssAvalability(days.slots[slots].booked)}>            
                <TableRowColumn>
                    <center>
                     <Menu 
                      iconButtonElement={                      
                          <RaisedButton label="Primary" primary={true}onTouchTap={this.handleOpenMenu} 
                              label={this.Avalability(days.slots[slots].booked)}
                              disabled = {this.ButtonAvailability(days.slots[slots].booked)}
                              > 
                          </RaisedButton>}
                      open={this.onClick}
                      onRequestChange={this.handleOnRequestChange}
                      >
                    <MenuItem value="1" primaryText="Reject" onClick = {() => this.decide("reject",days.name,slots)} />
                    <MenuItem value="2" primaryText="Approve" onClick = {() => this.decide("approve",days.name,slots)}/>  
                        </Menu>
                </center>
                </TableRowColumn>
                <TableRowColumn><spanss>{days.slots[slots].time}</spanss></TableRowColumn>
                <TableRowColumn><span>{days.name}</span></TableRowColumn>  
            </TableRow>
                       
                 )
                 }))
            
     return(
       <div>
         <center>
             <div>
                    <Table className ="tableDesign" selectable = {false}>
                    <TableHeader displaySelectAll ={false} enableSelectAll={false}>
                    <TableRow className = "trDesign">
                        <TableHeaderColumn><span>Status</span></TableHeaderColumn>                         
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
            {button}
   </div> 
   
  
  );
  }

}

export default Acceptor;
