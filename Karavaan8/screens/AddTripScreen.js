import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, TextInput,Image} from 'react-native';
import { CreateTripJSON, getTrips } from '../model/JSONUtils'
import DatePicker from 'react-native-datepicker'

export default class AddTripScreen extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = { trip_id: "",destination: "", start_date:"",end_date:""};
		this.send = this.send.bind(this);
		//[{"trip_id","Destination","start","end"}]
	}
	async send()
	{
		var {navigate} = this.props.navigation;
		if(this.state.destination == "")
		{
			 Alert.alert("The Destination cannot be zero");
		}
		else
		{
			var result =
			{
				destination: this.state.destination,
				start_date:  this.state.start_date,
				end_date: this.state.end_date,
				trip_id:"0",

			};
			try
			{
			var setResult = await CreateTripJSON(result.trip_id,result.destination,result.start_date,result.end_date);
			if(!setResult){
				Alert.alert("Oops, something went wrong :(");
			}else
				{
					this.props.navigation.navigate("Trips");
					
				}
			}
			catch(error)
			{
				console.log(error);
			}
		}
	}
	render() {
	var {navigate} = this.props.navigation;
	const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
	const tableData = [['1', '2', '3', '4'],['a', 'b', 'c', 'd']];
	return (
		<Image source={require('../images/addTrip.jpg')} style={styles.imagecontainer}>
				<View style={styles.container}>
					<Text style={styles.text}>BESTEMMING</Text>
					<TextInput style={styles.textInput} onChangeText={(destination) => this.setState({destination})}value={this.state.destination}/>
					
					<Text style={styles.text}>STARTDATUM</Text>
					<DatePicker style={styles.date} date={this.state.start_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
					onDateChange={(date) => {this.setState({start_date: date})}} customStyles={{dateText :{color:'black',},placeholderText:{color : 'black',},}}/>
					
					<Text style={styles.text}>EINDDATUM</Text>
					<DatePicker style={styles.date} date={this.state.end_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
					onDateChange={(date) => {this.setState({end_date: date})}} customStyles={{dateText :{color:'black',},placeholderText:{color : 'black',},}}/>
					<TouchableHighlight style={styles.submitButton} onPress={this.send}>
						<Text>VOEG TOE</Text>
					</TouchableHighlight>
				</View>
		</Image>
    );
  }
}

const styles = StyleSheet.create({
	container :
	{
		marginTop: -200,
	},
	submitButton:
	{
	backgroundColor: "white",
	margin: 20,
	width: 200,
	height: 50,
	borderRadius: 2,
	borderWidth: 2,
	borderColor: '#A2A794',
	alignItems: 'center',
	justifyContent: 'center',
	marginLeft: 'auto',
	marginRight: 'auto'
	},
	date:
	{
		width: 200,
		marginLeft:'auto',
		marginRight:'auto',
		backgroundColor:'white',
		
	},
	text:
	{
		color : 'white',
		fontSize: 20,
	},
	textInput:
	{
		backgroundColor: 'white',
		height : 40,
		borderWidth:1,
		borderColor: 'grey',
		fontSize: 18,
		textAlign:'center',
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