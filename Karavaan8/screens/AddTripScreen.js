import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, TextInput,Image} from 'react-native';
import { createExpenseJSON,} from '../model/JSONUtils'
import DatePicker from 'react-native-datepicker'

export default class AddTripScreen extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = { destination: "", start_date:"",end_date:""};
		this.send = this.send.bind(this);
	}
	send()
	{
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
			};
			Alert.alert(result.destination);
			Alert.alert(result.start_date);
			Alert.alert(result.end_date);
		}
	}
	render() {
	var {navigate} = this.props.navigation;
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
  }
});