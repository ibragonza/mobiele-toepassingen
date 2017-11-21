import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground} from 'react-native';
import {CreateParticipantJSON} from '../model/JSONTransformer'
const util = require("util");

export default class FirstScreen extends React.Component {
	render() {
	var {navigate} = this.props.navigation;
	var trip = [];
	for(let i = 0; i < 15; i++)
	{
		trip.push(
			<TouchableHighlight style={styles.button} onPress={() => Alert.alert("Hallo")}>
				<View style={styles.buttonView}>
					<Text style={styles.buttonText}>BARCELONA</Text>
					<Text style={styles.buttonText}>XX/XX/XX</Text>
				</View>
			</TouchableHighlight>)
	}
    return (
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => navigate("AddTrip", {})}>
				<View>
					<Text style={styles.buttonText}>ADD TRIP</Text>
				</View>
			</TouchableHighlight>
			{trip}
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  addTripbutton : 
  {
	marginTop : 5,
	marginBottom : 10,
	borderRadius : 3,
	width : 200,
	height: 70,
	marginLeft: 'auto',
	marginRight: 'auto',
	backgroundColor : '#00FF7F',
	justifyContent : 'center',
	alignItems: 'center',
  },
  navbar :
  {
	backgroundColor:'#2F4F4F',
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
	backgroundColor : '#FF6347'
  },
  buttonText :
  {
	fontSize: 20,
	color: 'white',
	textAlign:'center',
  }
});