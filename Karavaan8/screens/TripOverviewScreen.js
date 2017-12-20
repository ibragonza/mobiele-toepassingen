import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { createExpenseJSON, getTrips,removeTrip } from '../model/JSONUtils'
const util = require("util");

export default class TripOverviewScreen extends React.Component {
constructor(props)
	{
		super(props);
		this.state = { trips : []};
		//[{"trip_id","Destination","start","end"}]
	}
	render() {
	var {navigate} = this.props.navigation;
	var trip = this.props.navigation.state.params.trip;
    return (
		<Image source={require('../images/tripOverview.jpeg')} style={styles.imagecontainer}>
		<Text style={styles.headText}>Your trip to {trip.destination}</Text>
		<Text style={styles.headText}>From {trip.start_date} To {trip.end_date}</Text>
		<Text style={styles.expenseText}>Expenses</Text>
		</Image>
    );
  }
}

const styles = StyleSheet.create({
  headText:
	{
		color : 'white',
		fontSize: 30,
		textAlign: 'center',
	},
  expenseText:
	{
		color : 'white',
		fontSize : 30,
		textAlign: 'left',
		marginLeft : 20,
	},
  imagecontainer:{
	flex: 1,
	width: undefined,
	height: undefined,
	backgroundColor:'transparent',
	justifyContent: 'center',
	alignItems: 'center',
  },
});