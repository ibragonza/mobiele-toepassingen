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
			<View style={styles.buttonContainer}>
				<View style={styles.buttonView}>
					<TouchableHighlight onPress={() => navigate("AddTrip", {})}>
					<View>
						<Text style={styles.buttonText}>BARCELONA</Text>
						<Text style={styles.buttonText}>XX/XX/XX</Text>
					</View>
					</TouchableHighlight>
				</View>
				<View>
						<TouchableHighlight style={styles.exitcolumn} onPress={() => navigate("AddTrip", {})}>
							<Text style={styles.exitText}>X</Text>
						</TouchableHighlight>
				</View>
			</View>)
	}
    return (
		<Image source={require('../images/trips.jpg')} style={styles.imagecontainer}>
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => navigate("AddTrip", {})}>
				<View>
					<Text style={styles.buttonText}>ADD TRIP</Text>
				</View>
			</TouchableHighlight>
			{trip}
		</ScrollView>
		</Image>
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
	backgroundColor : 'white',
	width : 40,
	height: 53,
	alignSelf:'center',
	justifyContent:'center',
	borderRadius: 8,
	borderWidth: 2,
	borderColor: '#A2A794',
	
  },
    exitText : 
  {
	color: 'red',
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
	backgroundColor : '#FF6347',
	width : 160,
	borderRadius: 8,
	borderWidth: 2,
	borderColor: '#A2A794',
  },
  buttonContainer:
  {
	flexDirection: 'row',
	marginTop:20,
  },
  buttonText :
  {
	fontSize: 20,
	color: 'black',
	textAlign:'center',
  }

});