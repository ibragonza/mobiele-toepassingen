import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { getBalance } from '../model/JSONUtils'
import styles from './styles.js'
import email from 'react-native-email'

const util = require("util");

export default class Balance extends React.Component {
	constructor(props) {
		super(props);
		this.state = { total:0 };
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData().done();
	}

	refresh() {
		this.fetchData();
	}
    
	async fetchData() {
        const total = await getBalance();
        console.log(total);
		this.setState({ total: total });
	}


	render() {
		var { navigate } = this.props.navigation;
        
        
                return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
			<Text style={styles.header}>Balance {this.state.total}</Text>
					
		</Image>
    );
  }
}