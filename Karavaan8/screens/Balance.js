import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image,AsyncStorage } from 'react-native';
import { getBalance } from '../model/JSONUtils'
import styles from './styles.js'
import email from 'react-native-email'

const util = require("util");

export default class Balance extends React.Component {
	constructor(props) {
		super(props);
		this.state = { total:0,payCurrency : "EUR" };
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData().done();
		this.getPreferredCurrency().done();
	}

	refresh() {
		this.fetchData();
	}
    
	async fetchData() {
        const total = await getBalance();
		this.setState({ total: total });
	}

	async getPreferredCurrency(){
        const cur = await AsyncStorage.getItem('@Store:currency');
        this.setState({payCurrency:cur});
    }

	render() {
		var { navigate } = this.props.navigation;
        
        
                return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
			<Text style={styles.header}>Balance</Text>
			<Text style={styles.header}>{this.state.total} {this.state.payCurrency}</Text>
					
		</Image>
    );
  }
}