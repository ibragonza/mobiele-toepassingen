import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, Image} from 'react-native';
import { createExpenseJSON, getTrips,removeTrip,getExpensesPerTrip, getLoansPerTrip } from '../model/JSONUtils'
const util = require("util");

export default class TripOverviewScreen extends React.Component {
constructor(props)
	{
		super(props);
		this.state = { expenses : [], loans : []};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData().done();
		this.getLoans().done();
	}

	refresh() {
			this.fetchData();
			this.getLoans();
	}

	async fetchData() {
		console.log("=========================== started loading ========================");
		var trip = this.props.navigation.state.params.trip;
		const expenses = await getExpensesPerTrip(trip.trip_id);
		console.log(expenses);
		this.setState({expenses : expenses});
	}
	
	async getLoans(){
		console.log("=========================== started loading ========================");
		var trip = this.props.navigation.state.params.trip;
		const loans = await getLoansPerTrip(trip.trip_id);
		console.log(loans);
		this.setState({loans : loans});
	}

	render() {
	var {navigate} = this.props.navigation;
	var trip = this.props.navigation.state.params.trip;

	var expensesView = this.state.expenses.map((entry,index) => (
<View style={styles.rows}>
			<Text style={styles.rowText}>{entry.reason}</Text>
			<Text style={styles.rowText}>{entry.target_id}</Text>
			<Text style={styles.rowText}>{entry.amount} {entry.currency}</Text>
			<TouchableHighlight style={styles.edit} onPress = {navigate()}>
			<View>
				<Text style={styles.editText}>X</Text>
			</View>
			</TouchableHighlight>
		</View>
		));

		var loansView = this.state.loans.map((loan,index) => (
			<View style={styles.rows}>
						<Text style={styles.rowText}>{loan.reason}</Text>
						<Text style={styles.rowText}>{loan.sender_id}</Text>
						<Text style={styles.rowText}>{loan.amount} {loan.currency}</Text>
						<TouchableHighlight style={styles.edit} onPress = {navigate()}>
						<View>
							<Text style={styles.editText}>X</Text>
						</View>
						</TouchableHighlight>
					</View>
					));

    return (
		<Image source={require('../images/tripOverview.jpeg')} style={styles.imagecontainer}>
		<Text style={styles.headerText}>Your trip to {trip.destination}</Text>
		<Text style={styles.dateText}>From {trip.start_date} To {trip.end_date}</Text>
		<Text style={styles.expenseText}>Money Lend</Text>
		<ScrollView>
		<View style={styles.tableView}>
		<View style={styles.head}>
		<Text style={styles.headText}>Description</Text>
		<Text style={styles.headText}>To</Text>
		<Text style={styles.headText}>Amount</Text>
		<Text style={styles.headText}>Edit</Text>
		</View>
		{expensesView}
		</View>

		</ScrollView>
		<Text style={styles.expenseText}>Money Borrowed</Text>
		<ScrollView>
		<View style={styles.tableView}>
		<View style={styles.head}>
		<Text style={styles.headText}>Description</Text>
		<Text style={styles.headText}>From</Text>
		<Text style={styles.headText}>Amount</Text>
		<Text style={styles.headText}>Edit</Text>
		</View>
		{loansView}
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
		textAlign : 'left',
		alignSelf:'stretch',
		color : 'white',
		fontSize : 30,
		marginTop: 20,
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