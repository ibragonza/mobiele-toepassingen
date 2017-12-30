import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { createExpenseJSON, getTrips,removeTrip,getExpenses } from '../model/JSONUtils'
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
		<ScrollView>
		<Text style={styles.headerText}>Your trip to {trip.destination}</Text>
		<Text style={styles.dateText}>From {trip.start_date} To {trip.end_date}</Text>
		<Text style={styles.expenseText}>Expenses</Text>
		<View style={styles.tableView}>
		<View style={styles.head}>
		<Text style={styles.headText}>Discription</Text>
		<Text style={styles.headText}>Reason</Text>
		<Text style={styles.headText}>Amount</Text>
		<Text style={styles.headText}>Edit</Text>
		</View>
		<View style={styles.rows}>
			<Text style={styles.rowText}>ROW</Text>
			<Text style={styles.rowText}>ROW</Text>
			<Text style={styles.rowText}>ROW</Text>
			<TouchableHighlight style={styles.edit} onPress = {navigate()}>
			<View>
				<Text style={styles.editText}>X</Text>
			</View>
			</TouchableHighlight>
		</View>
		</View>
		</ScrollView>
		</Image>
    );
  }
}

const styles = StyleSheet.create({
  headerText:
	{
		color : 'white',
		fontSize: 50,
		textAlign: 'center',
	},
  dateText:
	{
		fontSize: 20,
		color : 'white',
		marginTop: 20,
		alignSelf:'center',
	},
  expenseText:
	{
		color : 'white',
		fontSize : 30,
		marginTop: 20,
		alignSelf:'flex-start',
	},
  head:
	{ 
		flexDirection : 'row',
		borderBottomWidth : 2,
		borderBottomColor : 'black',
		backgroundColor: 'white',
	},
  headText:
	{
		marginLeft: 5,
		fontSize : 21,
		width: 105,
		
	},
  rows:
  {
	flexDirection: 'row',
	backgroundColor : 'white',
  },
  rowText : 
  {
	marginLeft : 5,
	fontSize : 19,
	width: 105,
  },
  tableView:
	{
		alignSelf:'center',
		marginTop: 20,
	},
  edit:
  {
	 flexDirection: 'row',
  },
  editText:
  {
	textAlign:'center',
	fontSize: 19,
	width: 50,
	color : 'red',
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