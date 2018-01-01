import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { clearExpenses, clearTrips,clearPersons } from '../model/DevUtils'
import TripButton from '../view/TripButton.js';

const util = require("util");

export default class DeveloperScreen extends React.Component {
	constructor(props)
	{
		super(props);
		console.disableYellowBox = true;
		this.clearExp = this.clearExp.bind(this);
		this.clearTrip = this.clearTrip.bind(this);
		this.clearPeople = this.clearPeople.bind(this);
	}
	async clearExp()
	{
		try
		{
			await clearExpenses();
			alert("Succesfully deleted Expenses");
		}
		catch(error)
		{
			console.log(error);
		}
	}
	
	async clearTrip()
	{
		try
		{
			await clearTrips();
			alert("Succesfully deleted Trips");
		}
		catch(error)
		{
			console.log(error);
		}
	}
	async clearPeople()
	{
		try
		{
			await clearPersons();
			alert("Succesfully deleted Persons");
		}
		catch(error)
		{
			console.log(error);
		}
	}
	
	render() {
	return (
		<Image source={require('../images/pjf.jpg')} style={styles.imagecontainer}>
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.Back} onPress={() => this.props.navigation.goBack()}>
				<View>
					<Text style={styles.addButtonText}>Back</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => this.clearExp()}>
				<View>
					<Text style={styles.addButtonText}>Clear Expenses</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => this.clearPeople()}>
				<View>
					<Text style={styles.addButtonText}>Clear Persons</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => this.clearTrip()}>
				<View>
					<Text style={styles.addButtonText}>Clear Trips</Text>
				</View>
			</TouchableHighlight>
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
  addTripbutton : 
  {
	marginTop: 15,
	borderRadius: 3,
	width: 200,
	height: 70,
	marginLeft: 'auto',
	marginRight: 'auto',
	backgroundColor: 'red',
	justifyContent: 'center',
	alignItems: 'center',
	},
	Back:
	{
		marginTop: 15,
		borderRadius: 3,
		width: 200,
		height: 70,
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: '#00FF7F',
		justifyContent: 'center',
		alignItems: 'center',
	},
  addButtonText :
  {
	fontSize: 24,
	color: 'white',
	textAlign:'center',
  },
  buttonText : 
  {
	fontSize: 21,
	textAlign: 'center',
  },
});