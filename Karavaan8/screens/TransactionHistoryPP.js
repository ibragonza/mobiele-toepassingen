import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image, AsyncStorage } from 'react-native';
import { getTransactionsPerPerson } from '../model/JSONUtils'
import styles from './styles.js'
import email from 'react-native-email'

const util = require("util");

export default class TransactionHistoryPP extends React.Component {
	constructor(props) {
		super(props);
		this.state = { transactions: [], person:this.props.navigation.state.params.person, payCurrency : "EUR" };
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData().done();
		this.getPreferredCurrency().done();
	}

	refresh() {
		this.fetchData();
	}

	async getPreferredCurrency(){
        const cur = await AsyncStorage.getItem('@Store:currency');
        this.setState({payCurrency:cur});
    }
    
	async fetchData() {
		var person = this.props.navigation.state.params.person;
		const transactions = await getTransactionsPerPerson(person.name);
		this.setState({ transactions: transactions });
	}


	render() {
		var { navigate } = this.props.navigation;
        
            var view = this.state.transactions.map((entry, index) => (
                    <View style={styles.rows} key={index} >
                        <Text style={styles.rowTextTransactionOverview}>{entry.date}</Text>
                        <Text style={styles.rowTextTransactionOverview}>{entry.from}</Text>
                        <Text style={styles.rowTextTransactionOverview}>{entry.to}</Text>
                        <Text style={styles.rowTextTransactionOverview}>{entry.amount} {this.state.payCurrency}</Text>
                    </View>
                ));
        
                return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
			<Text style={styles.header}>Transactions regarding {this.state.person.name}</Text>
					<View style={styles.tableView}>
						<View style={styles.head}>
                            <Text style={styles.headTextTransactionOverview}>Date</Text>
							<Text style={styles.headTextTransactionOverview}>From</Text>
							<Text style={styles.headTextTransactionOverview}>To</Text>
							<Text style={styles.headTextTransactionOverview}>Amount</Text>
						</View>
						{view}
					</View>
		</Image>
    );
  }
}