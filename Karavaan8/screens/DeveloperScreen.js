import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { clearExpenses, clearTrips,clearPersons, clearTransactions } from '../model/DevUtils'
import { getAllCurrencies } from '../model/Converter'
import TripButton from '../view/TripButton.js';

export default class DeveloperScreen extends React.Component {
	constructor(props)
	{
		super(props);
		console.disableYellowBox = true;
		this.state = {currency : "EUR", currencies: [], name: "Vogels",loaded : false};
		this.clearExp = this.clearExp.bind(this);
		this.clearTrip = this.clearTrip.bind(this);
		this.clearPeople = this.clearPeople.bind(this);
		this.clearTrans = this.clearTrans.bind(this);
		this.getCurrentCurrencies = this.getCurrentCurrencies.bind(this);
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
	
	async clearTrans()
	{
		try
		{
			await clearTransactions();
			alert("Succesfully deleted Transactions");
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
	async getCurrentCurrencies()
	{
		try
		{
			await getAllCurrencies();
			alert("Succesfully got Currencies");
		}
		catch(error)
		{
			console.log("DeveloperScreen : "+ error);
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
			<TouchableHighlight style={styles.addTripbutton} onPress={() => this.getCurrentCurrencies()}>
				<View>
					<Text style={styles.addButtonText}>Get Currencies</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => this.clearTrans()}>
				<View>
					<Text style={styles.addButtonText}>Clear Transactions</Text>
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