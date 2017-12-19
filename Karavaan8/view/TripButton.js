import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { createExpenseJSON, getTrips,removeTrip } from '../model/JSONUtils'
const util = require("util");

export default class TripButton extends React.Component {
  
  render() {
    return (
      <View style={styles.buttonContainer}>
      <View style={styles.buttonView}>
        <TouchableHighlight onPress={() => navigate("TripOverviewScreen", {})}>
        <View>
          <Text style={styles.buttonText}>{this.props.destination}</Text>
          <Text style={styles.buttonText}>{this.props.start_date}</Text>
        </View>
        </TouchableHighlight>
      </View>
      <View>
          <TouchableHighlight style={styles.exitcolumn} onPress={() => this.deleteTrip(this.props.trip_id)}>
            <Text style={styles.exitText}>X</Text>
          </TouchableHighlight>
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  imagecontainer:{
	flex: 1,
	width: undefined,
	height: undefined,
	backgroundColor:'transparent',
	justifyContent: 'center',
	alignItems: 'center',
  },
  exitcolumn : 
  {
	//backgroundColor : 'red',
	backgroundColor: '#FF4136',
	width : 40,
	flex: 1,
	//height: 55,
	alignSelf:'center',
	justifyContent:'center',
	//borderRadius: 8,
	//borderWidth: 2,
	borderColor: '#A2A794',
	
  },
    exitText : 
  {
	color: 'white',
	alignSelf:'center',
	justifyContent:'center',
	fontSize:30,
  },
  addTripbutton : 
  {
	backgroundColor: "white",
	margin: 20,
	width: 200,
	height: 50,
	borderRadius: 8,
	borderWidth: 2,
	borderColor: '#A2A794',
	alignItems: 'center',
	justifyContent: 'center',
	marginLeft: 'auto',
	marginRight: 'auto'
	},
  button : 
  {
	marginBottom : 10,
	borderRadius : 3,
	width : 200,
	height: 70,
	marginLeft: 'auto',
	marginRight: 'auto',
	backgroundColor:'transparent',
	
  },
  buttonView:
  {
	width: 160,
	/*
	backgroundColor : '#FF6347',
	width : 160,
	borderRadius: 8,
	borderWidth: 2,
	borderColor: '#A2A794',
	*/
  },
  buttonContainer:
  {
	flexDirection: 'row',
	backgroundColor: '#DDDDDD',
	//backgroundColor: 'white',
	borderRadius: 4,
	borderWidth: 2,
	marginTop:20,
  },
  buttonText :
  {
	fontSize: 20,
	color: 'black',
	textAlign:'center',
  }

});