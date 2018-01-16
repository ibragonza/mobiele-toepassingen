import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { createExpenseJSON, getTrips, removeTrip, getExpensesPerTrip, getLoansPerTrip, getExpensesPerPerson, getLoansPerPerson } from '../model/JSONUtils'
import styles from './styles.js'
import email from 'react-native-email'

const util = require("util");

export default class PeopleExpenses extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expenses: [], loans: [], person:this.props.navigation.state.params.person };
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

    async sendEmail(sendTo) {
        email(sendTo, {
        subject: 'Email from Karavaan',
                 body: 'Some body right here'
        }).catch(console.error)
    }
    
	async fetchData() {
		console.log("=========================== started loading ========================");
		var person = this.props.navigation.state.params.person;
		const expenses = await getExpensesPerPerson(person);
		this.setState({ expenses: expenses });
	}

	async getLoans() {
		console.log("=========================== started loading ========================");
		var person = this.props.navigation.state.params.person;
	    const loans = await getLoansPerPerson(person);
		this.setState({ loans: loans });
	}

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
			<Text style={styles.header}>Expenses for {this.state.person}</Text>
        <TouchableHighlight style={styles.addButton} onPress={() => this.sendEmail(this.state.person)}>
			<View>
				<Text style={styles.buttonText}>SEND MAIL</Text>
			</View>
		</TouchableHighlight>
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
			color: 'white',
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