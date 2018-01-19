import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { getTransactionsPerPerson } from '../model/JSONUtils'
import styles from './styles.js'
import email from 'react-native-email'

const util = require("util");

export default class TransactionHistoryPP extends React.Component {
	constructor(props) {
		super(props);
		this.state = { transactions: [], person:this.props.navigation.state.params.person };
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData().done();
	}

	refresh() {
		this.fetchData();
	}
    
	async fetchData() {
		var person = this.props.navigation.state.params.person;
        const transactions = await getTransactionsPerPerson(person.name);
        console.log(transactions);
		this.setState({ transactions: transactions });
	}


	render() {
		var { navigate } = this.props.navigation;
        
            var view = this.state.transactions.map((entry, index) => (
                    <View style={styles.rows} >
                        <Text style={styles.rowText}>{entry.date}</Text>
                        <Text style={styles.rowText}>{entry.from}</Text>
                        <Text style={styles.rowText}>{entry.to}</Text>
                        <Text style={styles.rowText}>{entry.amount}</Text>
                    </View>
                ));
        
                return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
			<Text style={styles.header}>Transactions regarding {this.state.person.name}</Text>
					<View style={styles.tableView}>
						<View style={styles.head}>
                            <Text style={styles.headText}>Date</Text>
							<Text style={styles.headText}>From</Text>
							<Text style={styles.headText}>To</Text>
							<Text style={styles.headText}>Amount</Text>
						</View>
						{view}
					</View>
		</Image>
    );
  }
}