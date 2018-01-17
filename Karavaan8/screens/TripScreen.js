import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { getTrips, removeTrip, createList } from '../model/JSONUtils'
import TripButton from '../view/TripButton.js';
import styles from './styles.js'

const util = require("util");

export default class FirstScreen extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = { trips : []};
		this.fetchData = this.fetchData.bind(this);
		this.deleteTrip = this.deleteTrip.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
		console.disableYellowBox = true;
	}

	componentDidMount() {
        this.fetchData().done();
	}

	refresh() {
		this.fetchData();
	}
	
	async fetchData() {
		console.log("FetchData too");
		const trips = await getTrips();
		var list = await createList(trips, "trip")
		this.setState({trips : list});
    }

	async deleteTrip(tripId)
	{
		const trips = await removeTrip(tripId);
		var list = await createList(trips, "trip")
        this.setState({trips : list});
	}

	confirmDelete(tripId)
	{
		Alert.alert('Delete Trip?','Are you sure you want to delete this Trip?',
		[{text: 'Delete', onPress: () => this.deleteTrip(tripId)},
		{text: 'I Changed my Mind', onPress: () => console.log('OK Pressed')},],
		{ cancelable: false })
	}

	render() {
	var {navigate} = this.props.navigation;
	var trip = [];

	var trip = this.state.trips.map((entry,index) => (
	<View style={styles.buttonContainer}>
			<View style={styles.buttonView}>
				<TouchableHighlight onPress={() => navigate("TripOverviewScreen",{trip:entry})}>
				<View>
					<Text style={styles.buttonViewText}>{entry.destination}</Text>
					<Text style={styles.buttonViewText}>{entry.start_date}</Text>
					<Text style={styles.buttonViewText}>{entry.end_date}</Text>
					<Text style={styles.buttonViewText}>{entry.trip_currency}</Text>
				</View>
				</TouchableHighlight>
			</View>
			<View>
					<TouchableHighlight style={styles.exitcolumn} onPress={() => this.confirmDelete(entry.trip_id)}>
						<Text style={styles.exitText}>X</Text>
					</TouchableHighlight>
			</View>
	</View>));
	
    return (
		<Image source={require('../images/trips.jpg')} style={styles.container}>
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.addButton} onPress={() => navigate("AddTrip", {onGoBack: () => this.refresh()})}>
				<View>
					<Text style={styles.addButtonText}>ADD TRIP</Text>
				</View>
			</TouchableHighlight>
			{trip}
		</ScrollView>
		</Image>
    );
  }
}