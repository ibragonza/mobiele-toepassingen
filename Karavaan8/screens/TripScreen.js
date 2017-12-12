import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { createExpenseJSON } from '../model/JSONUtils'
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
			<Image source={require('../images/trips.jpg')} style={styles.imagecontainer}>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => navigate("AddTrip", {})}>
				<View>
					<Text style={styles.buttonText}>ADD TRIP</Text>
				</View>
			</TouchableHighlight>
			{trip}
		</Image>
		</ScrollView>
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