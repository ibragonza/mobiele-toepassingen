import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { createExpenseJSON, getTrips,removeTrip } from '../model/JSONUtils'
const util = require("util");

export default class FirstScreen extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = { trips : []};
		this.fetchData = this.fetchData.bind(this);
		this.deleteTrip = this.deleteTrip.bind(this);
		//[{"trip_id","Destination","start","end"}]
	}

	componentDidMount() {
    this.fetchData().done()
	}
	
	async fetchData() {
    const trips = await getTrips();
		this.setState({trips : trips});
		console.log("---------------------------------------------------------------------------------");
		console.log(this.state.trips);
  }
	async deleteTrip(tripId)
	{
		removeTrip(tripId);
		alert("Gelukt");
		navigate("TripScreen",{})
	}


	render() {
	var {navigate} = this.props.navigation;
	var trips = this.state.trips;
	var trip = [];
	for(var key in trips){
		console.log(trips[key]);
		trip.push(	
			<View style={styles.buttonContainer}>
				<View style={styles.buttonView}>
					<TouchableHighlight onPress={() => navigate("AddTrip", {})}>
					<View>
						<Text style={styles.buttonText}>{trips[key].destination}</Text>
						<Text style={styles.buttonText}>{trips[key].start_date}</Text>
					</View>
					</TouchableHighlight>
				</View>
				<View>
						<TouchableHighlight style={styles.exitcolumn} onPress={() => this.deleteTrip(trips[key]["trip_id"])}>
							<Text style={styles.exitText}>X</Text>
						</TouchableHighlight>
				</View>
			</View>)
	}
/*
	
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
	}*/
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