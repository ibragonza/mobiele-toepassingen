import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight,TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { getExpensesPerTrip, getLoansPerTrip } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class TripOverviewScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expenses: [], loans: [], disabled: false};
		this.fetchData = this.fetchData.bind(this);
		this.toLoanExpenseDetails = this.toLoanExpenseDetails.bind(this);
		this.toExpenseDetails = this.toExpenseDetails.bind(this);
	}
	componentDidMount() {
		this.fetchData().done();
		this.getLoans().done();
	}

	refresh() {
		this.fetchData();
		this.getLoans();
	}
	toExpenseDetails(entry)
	{
		var touchable = this._touchable;
		touchable.disabled = true;
		//this.setState({disabled : true});
		this.props.navigation.navigate("ExpenseDetails", {expense : entry,onGoBack: () => this.refresh()})
		//this.setState({disabled : false});
	}
	toLoanExpenseDetails(loan)
	{
		//this.setState({disabled : true});
		//navigate("ExpenseDetails",{expense : loan,onGoBack: () => this.refresh()})
		//console.log("Hallo");
		//this.setState({disabled : false});
		navigate("ExpenseDetails", {expense : entry,onGoBack: () => this.refresh()})
	}

	async fetchData() {
		var trip = this.props.navigation.state.params.trip;
		const expenses = await getExpensesPerTrip(trip.trip_id);
		this.setState({ expenses: expenses });
	}

	async getLoans() {
		var trip = this.props.navigation.state.params.trip;
		const loans = await getLoansPerTrip(trip.trip_id);
		this.setState({ loans: loans });
	}

	render() {
		var { navigate } = this.props.navigation;
		var trip = this.props.navigation.state.params.trip;

		var expensesView = this.state.expenses.map((entry, index) => (
		<TouchableHighlight style={styles.edit} ref = {component => this._touchable = component} activeOpactity={this.state.disabled ? 0.3 : 1} onPress={ () => this.toExpenseDetails(entry)}>
			<View style={styles.rows} key={"Expenses"+index}>
				<Text style={styles.rowText}>{entry.reason}</Text>
				<Text style={styles.rowText}>{entry.target_id}</Text>
				<Text style={styles.rowText}>{entry.amount} {entry.currency}</Text>
			</View>
		</TouchableHighlight>
		));

		var loansView = this.state.loans.map((loan, index) => (
			<TouchableOpacity style={styles.edit} activeOpactity={this.state.disabled ? 1 : 0.3} onPress={!this.state.disabled && this.toLoanExpenseDetails(loan)}>
			<View style={styles.rows} key={"Loans"+index}>
				<Text style={styles.rowText}>{loan.reason}</Text>
				<Text style={styles.rowText}>{loan.sender_id}</Text>
				<Text style={styles.rowText}>{loan.amount} {loan.currency}</Text>
			</View>
			</TouchableOpacity>
		));

		return (
			<Image source={require('../images/tripOverview.jpeg')} style={styles.container}>
				<Text style={styles.header}>Your trip to {trip.destination}</Text>
				<Text style={styles.dateText}>From {trip.start_date} To {trip.end_date}</Text>
				<Text style={styles.expenseText}>Money Lend</Text>
				<ScrollView>
					<View style={styles.tableView}>
						<View style={styles.head}>
							<Text style={styles.headFirstText}>Description</Text>
							<Text style={styles.headText}>To</Text>
							<Text style={styles.headText}>Amount</Text>
						</View>
						{expensesView}
					</View>
				</ScrollView>
				
				<Text style={styles.expenseText}>Money Borrowed</Text>
				<ScrollView>
					<View style={styles.tableView}>
						<View style={styles.head}>
							<Text style={styles.headFirstText}>Description</Text>
							<Text style={styles.headText}>From</Text>
							<Text style={styles.headText}>Amount</Text>
						</View>
						{loansView}
					</View>
				</ScrollView>
			</Image>
		);
	}
}