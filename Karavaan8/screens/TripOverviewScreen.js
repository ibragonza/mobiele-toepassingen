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
	const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
	const tableData = [['1', '2', '3', '4'],['a', 'b', 'c', 'd']];
    return (
		<Image source={require('../images/tripOverview.jpeg')} style={styles.imagecontainer}>
		<ScrollView>
		<Text style={styles.headText}>Your trip to {trip.destination}</Text>
		<Text style={styles.dateText}>From {trip.start_date} To {trip.end_date}</Text>
		<Text style={styles.expenseText}>Expenses</Text>
		<View style={styles.tableView}>
			<Table style={styles.table}>
				<Row data={tableHead} style={styles.head} textStyle={styles.text}/>
				<Rows data={tableData} style={styles.row} textStyle={styles.text}/>
			</Table>
		</View>
		</ScrollView>
		</Image>
    );
  }
}

const styles = StyleSheet.create({
  headText:
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
		height: 100,
		width: 200,
		backgroundColor: 'green'
	},
  text:
	{
		marginLeft: 5,
	},
  row:
  {
	height: 100,
	width : 200,
	backgroundColor: 'white',
	
  },
  table:
	{
		
	},
  tableView:
	{
		alignSelf:'flex-start',
		marginTop: 20,
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