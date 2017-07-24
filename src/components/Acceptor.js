import React, { Component } from 'react';
import firebase from 'firebase';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import Circle from 'material-ui/svg-icons/action/account-box';
import Done from 'material-ui/svg-icons/action/done';
import Close from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import '../App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Acceptor extends Component {
        constructor(props){
        super(props)
            this.state = {days: [] ,listRef :undefined 
              ,userCount: "", message: "", open :false
            }               
            this.pushToFirebase = this.pushToFirebase.bind(this);
            
  }    
componentDidMount(){
        this.listRef = firebase.database().ref('presence/');
        this.listRef.on('value', snap =>{
        this.setState({        
          userCount: snap.numChildren()
        })        
        })
     
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
        this.setState({
          open :true,
          message : "Successfully Reset the data"
        })
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
    this.listRef.off();
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
    const approve  = () => {this.firebaseRef.child(dayname.toLowerCase()).child('slots').child(slot).update({ booked: true })
    this.setState({
    open :true,
    message : "Request Successfully Booked!"
    });}
    const reject  = () => {this.firebaseRef.child(dayname.toLowerCase()).child('slots').child(slot).update({ booked: false })
    this.setState({
    open :true,
    message : "Request Successfully Rejected!"
    });}
    value === "approve"?
    approve()
    :
    reject()



}
handleTouchTap = () => {
    this.setState({
      open: false,
    });
  }; 
  render(){   
const style = { color: 'white' , backgroundColor: '#E91E63',}
const menuR = { color: 'white' , backgroundColor: '#42A5F5',}
const menuA = { color: 'white' , backgroundColor: '#EC407A',}
const adminpart =
                  <AppBar
                    showMenuIconButton = {false}
                    title="Acceptor Page"
                    zDepth = {1}
                    className = "appbar"
                   
                    iconElementRight={
                      <div>
                    <Badge
                      badgeContent={this.state.userCount}
                      secondary={true}
                      badgeStyle={{top: 12, right: 12}}
                       >
                      <IconButton tooltip="Online Users">
                        <Circle />
                      </IconButton>
                    </Badge>  
                   <FlatButton label="Reset" style={style}  onClick = {this.pushToFirebase} ></FlatButton>
                                  
                   </div>
                   }
                  />


const body =    this.state.days.map((days, index) =>
                 Object.keys(days.slots).map((slots, id) => {
                 return(
                  
           <TableRow className ={this.CssAvalability(days.slots[slots].booked)}>            
                <TableRowColumn>
                    <center>
                     <Menu 
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}     
                      iconButtonElement={                      
                          <RaisedButton label="Primary" primary={true}onTouchTap={this.handleOpenMenu} 
                              label={this.Avalability(days.slots[slots].booked)}
                              disabled = {this.ButtonAvailability(days.slots[slots].booked)}
                              > 
                          </RaisedButton>}
                      open={this.onClick}
                      >
                    <MenuItem value="2" primaryText="Approve" rightIcon = {<Done/>}style ={ menuA }onClick = {() => this.decide("approve",days.name,slots)}/>  
                    <MenuItem value="1" primaryText="Reject"  rightIcon = {<Close/>}style ={ menuR } onClick = {() => this.decide("reject",days.name,slots)} />
                         </Menu>
                </center>
                </TableRowColumn>
                <TableRowColumn><spanss>{days.slots[slots].time}</spanss></TableRowColumn>
                <TableRowColumn><span>{days.name}</span></TableRowColumn>  
            </TableRow>
                       
                 )
                 }))
            
     return(
       <div> {adminpart}
         <center>
             <div>
                    <Table className ="tableDesign" selectable = {false}     zDepth = {0}>
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
      <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="Close"
                    autoHideDuration={4000}
                    onActionTouchTap={this.handleTouchTap}
                    onRequestClose={this.handleTouchTap}
                />
   </div> 
   
  
  );
  }

}

export default Acceptor;
