import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, ScrollView, Image, Dropdown } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import { createExpense, getTrips,removeTrip,getPersons,getExpenses,getLoans } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class ExpensesScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {expenses:[],loans:[],person: "", target:"",trip: "", expense_date: "",trips:[], people : [],currency:"EURO",amount:"",reason:"",category:"ETEN",loaded:false };
        this.fetchData = this.fetchData.bind(this);
    }
	componentWillMount()
	{
    this.fetchData().done();
    this.getLoans().done();
	}

	refresh(){
		this.fetchData();
		this.getLoans();
	}

	async fetchData()
	{
		console.log("=========================== started loading ========================");
		const expenses = await getExpenses();
		console.log(expenses);
		this.setState({ expenses: expenses });
  }
  
  async getLoans()
	{
		console.log("=========================== started loading ========================");
		const loans = await getLoans();
		console.log(loans);
		this.setState({ loans: loans });
  }
  /*
  confirmDelete(expense_id)
  {
	Alert.alert('Expense Paid For?','Are you sure this Expense is payed For?',
	[{text: 'Delete', onPress: () => alert("Voorlopig")},
	{text: 'I Changed my Mind', onPress: () => console.log('OK Pressed')},],
	{ cancelable: false })
  }
  */
  render() {
    var { navigate } = this.props.navigation;

    var expensesView = this.state.expenses.map((entry, index) => (
			<View style={styles.rows}>
				<Text style={styles.rowText}>{entry.reason}</Text>
				<Text style={styles.rowText}>{entry.target_id}</Text>
				<Text style={styles.rowText}>{entry.amount} {entry.currency}</Text>
				<TouchableHighlight style={styles.edit} onPress={() => alert("Add navigation")}>
					<View>
						<Text style={styles.editText}>X</Text>
					</View>
				</TouchableHighlight>
			</View>
		));

		var loansView = this.state.loans.map((loan, index) => (
			<View style={styles.rows}>
				<Text style={styles.rowText}>{loan.reason}</Text>
				<Text style={styles.rowText}>{loan.sender_id}</Text>
				<Text style={styles.rowText}>{loan.amount} {loan.currency}</Text>
				<TouchableHighlight style={styles.edit} onPress={() => alert("Hallo")}>
					<View>
						<Text style={styles.editText}>X</Text>
					</View>
				</TouchableHighlight>
			</View>
		));



	return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
		<View style={styles.navbar}>
			<Text style={styles.header}>Expenses</Text>
		</View>
		<View style={styles.navbar}>
		<TouchableHighlight style={styles.addButton} onPress={() => navigate("AddExpense", {onGoBack: () => this.refresh()})}>
			<View>
				<Text style={styles.buttonText}>ADD EXPENSE</Text>
			</View>
		</TouchableHighlight>
		</View>
		<Text style={styles.expenseText}>Money Lend</Text>
					<View style={styles.tableView}>
						<View style={styles.head}>
							<Text style={styles.headText}>Description</Text>
							<Text style={styles.headText}>To</Text>
							<Text style={styles.headText}>Amount</Text>
							<Text style={styles.headText}>Edit</Text>
						</View>
						{expensesView}
					</View>
		<Text style={styles.expenseText}>Money Borrowed</Text>
					<View style={styles.tableView}>
						<View style={styles.head}>
							<Text style={styles.headText}>Description</Text>
							<Text style={styles.headText}>From</Text>
							<Text style={styles.headText}>Amount</Text>
							<Text style={styles.headText}>Edit</Text>
						</View>
						{loansView}
					</View>
		</Image>
    );
  }
}
/*
const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    fontWeight: 'bold'
  },
  navbar: {
    flex: 1,
    marginTop: 40,
  },
  navbarText:
    {
      fontSize: 20,
    },
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:
    {
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 3,
      width: 200,
      height: 70,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: '#00FF7F',
      justifyContent: 'center',
      alignItems: 'center',
    },
  buttonText:
    {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    headerText:
		{
			color: 'white',
			fontSize: 50,
			textAlign: 'center',
		},
	dateText:
		{
			fontSize: 20,
			color: 'white',
			marginTop: 20,
			alignSelf: 'center',
		},
	expenseText:
		{
			textAlign: 'left',
			alignSelf: 'stretch',
			color: '#2784A3',
			fontSize: 30,
			marginTop: 20,
		},
	head:
		{
			flexDirection: 'row',
			alignSelf: 'stretch',
			borderBottomWidth: 2,
			borderBottomColor: 'black',
			backgroundColor: 'white',
		},
	headthirdText:
		{
			width: 80,
			marginLeft: 2,
			fontSize: 21,
		},
	headFirstText:
		{
			width: 120,
			marginLeft: 2,
			fontSize: 21,
		},
	headSecText:
		{
			width: 100,
			fontSize: 21,
			textAlign: 'center',
		},
	headEditText:
		{
			marginLeft: 2,
			fontSize: 21,
			width: 60,
		},
	headText:
		{
			marginLeft: 5,
			fontSize: 21,
			textAlign: 'center',
			alignSelf: 'stretch',

		},
	rows:
		{
			flexDirection: 'row',
			backgroundColor: 'white',
		},
	rowText:
		{
			marginLeft: 5,
			fontSize: 19,
			width: 105,
		},
	tableView:
		{
			alignSelf: 'center',
			marginTop: 20,
		},
	edit:
		{
			flexDirection: 'row',
			backgroundColor : 'black',
		},
	editText:
		{
			textAlign: 'center',
			fontSize: 19,
			width: 50,
			color: 'red',
		},
	imagecontainer: {
		flex: 1,
		width: undefined,
		height: undefined,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
});*/
