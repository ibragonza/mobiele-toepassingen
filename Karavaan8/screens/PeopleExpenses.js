import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { getExpensesPerPerson, getLoansPerPerson } from '../model/JSONUtils'
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
        var emailAddress = sendTo.email;
        email(emailAddress, {
        subject: 'Email from Karavaan',
                 body: 'email sent from Karavaan app'
        }).catch(console.error)
    }
    
	async fetchData() {
		var person = this.props.navigation.state.params.person;
		const expenses = await getExpensesPerPerson(person.name);
		this.setState({ expenses: expenses });
	}

	async getLoans() {
		var person = this.props.navigation.state.params.person;
	    const loans = await getLoansPerPerson(person.name);
		this.setState({ loans: loans });
	}

	render() {
		var { navigate } = this.props.navigation;
        
            var expensesView = this.state.expenses.map((entry, index) => (
                    <TouchableHighlight key={"PPExpense"+index} onPress={() => navigate("ExpenseDetails", {expense : entry,onGoBack: () => this.refresh()})}>
                    <View style={styles.rows} >
                        <Text style={styles.rowText}>{entry.reason}</Text>
                        <Text style={styles.rowText}>{entry.target_id}</Text>
                        <Text style={styles.rowText}>{entry.amount} {entry.currency}</Text>
                        <TouchableHighlight style={styles.edit} onPress={() => alert("Hallo")}>
                            <View>
                                <Text style={styles.editText}>X</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    </TouchableHighlight>
                ));
        
                var loansView = this.state.loans.map((loan, index) => (
                    <TouchableHighlight key={"PPLoan"+index} onPress={() => navigate("ExpenseDetails", {expense : loan,onGoBack: () => this.refresh()})}>
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
                    </TouchableHighlight>

                ));

                return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
			<Text style={styles.header}>Expenses for {this.state.person.name}</Text>
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
		<TouchableHighlight style={styles.addButton} onPress={() => navigate("TransactionHistoryPP",{person : this.state.person})}>
			<View>
				<Text style={styles.buttonText}>Transaction History</Text>
			</View>
		</TouchableHighlight>
		</Image>
    );
  }
}