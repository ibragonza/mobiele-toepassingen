import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, ScrollView, Image, Dropdown } from 'react-native';
import { getExpenses,getLoans } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class ExpensesScreen extends React.Component {
	constructor(props) {
		console.disableYellowBox = true;
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
		const expenses = await getExpenses();
		this.setState({ expenses: expenses });
  }
  
  async getLoans()
	{
		const loans = await getLoans();
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
            <TouchableHighlight key={"ExpensesBut"+index} onPress={() => navigate("ExpenseDetails", {expense : entry,onGoBack: () => this.refresh()})}>
			<View style={styles.rows} key={"Expenses"+index}>
				<Text style={styles.rowTextTransactionOverview}>{entry.reason}</Text>
				<Text style={styles.rowTextTransactionOverview}>{entry.target_id}</Text>
				<Text style={styles.rowTextTransactionOverview}>{entry.amount_paid}</Text>
				<Text style={styles.rowTextTransactionOverview}>{entry.amount} {entry.currency}</Text>
			</View>
			</TouchableHighlight>
		));

		var loansView = this.state.loans.map((loan, index) => (
		    <TouchableHighlight key={"LoansBut"+index} onPress={() => navigate("ExpenseDetails", {expense : loan,onGoBack: () => this.refresh()})}>
			<View style={styles.rows} key={"Loans"+index}>
				<Text style={styles.rowTextTransactionOverview}>{loan.reason}</Text>
				<Text style={styles.rowTextTransactionOverview}>{loan.sender_id}</Text>
				<Text style={styles.rowTextTransactionOverview}>{loan.amount_paid}</Text>
				<Text style={styles.rowTextTransactionOverview}>{loan.amount} {loan.currency}</Text>
			</View>
			</TouchableHighlight>
		));



	return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
		<ScrollView>
		<View style={styles.navbar}>
			<Text style={styles.header}>Expenses</Text>
		</View>
		<Text style={styles.expenseText}>Money Lend</Text>
            <View style={styles.tableView}>
                <View style={styles.head}>
                    <Text style={styles.headTextTransactionOverview}>Description</Text>
                    <Text style={styles.headTextTransactionOverview}>To</Text>
					<Text style={styles.headTextTransactionOverview}>Paid</Text>
                    <Text style={styles.headTextTransactionOverview}>Amount</Text>
                </View>
                {expensesView}
            </View>
		<Text style={styles.expenseText}>Money Borrowed</Text>
            <View style={styles.tableView}>
                <View style={styles.head}>
                    <Text style={styles.headTextTransactionOverview}>Description</Text>
                    <Text style={styles.headTextTransactionOverview}>From</Text>
					<Text style={styles.headTextTransactionOverview}>Paid</Text>
                    <Text style={styles.headTextTransactionOverview}>Amount</Text>
                </View>
                {loansView}
            </View>
            <View style={styles.navbar}>
            <TouchableHighlight style={styles.addButton} onPress={() => navigate("AddExpense", {onGoBack: () => this.refresh()})}>
                <View>
                    <Text style={styles.buttonText}>ADD EXPENSE</Text>
                </View>
            </TouchableHighlight>
			<TouchableHighlight style={styles.addButton} onPress={() => navigate("SplitExpense", {onGoBack: () => this.refresh()})}>
				<View>
					<Text style={styles.buttonText}>SPLIT EXPENSE</Text>
				</View>
			</TouchableHighlight>

			<TouchableHighlight style={styles.addButton} onPress={() => navigate("TransactionHistory")}>
				<View>
					<Text style={styles.buttonText}>TRANSACTION HISTORY</Text>
				</View>
			</TouchableHighlight>
            </View>
		</ScrollView>
		</Image>
	);
  }
}