import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { getExpensesPerTrip, getLoansPerTrip } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class TripOverviewScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expenses: [], loans: [] };
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
			<View style={styles.rows}>
				<Text style={styles.rowText}>{entry.reason}</Text>
				<Text style={styles.rowText}>{entry.target_id}</Text>
				<Text style={styles.rowText}>{entry.amount} {entry.currency}</Text>
				<TouchableHighlight style={styles.edit} onPress={navigate()}>
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
				<TouchableHighlight style={styles.edit} onPress={navigate()}>
					<View>
						<Text style={styles.editText}>X</Text>
					</View>
				</TouchableHighlight>
			</View>
		));

		return (
			<Image source={require('../images/tripOverview.jpeg')} style={styles.container}>
				<Text style={styles.header}>Your trip to {trip.destination}</Text>
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