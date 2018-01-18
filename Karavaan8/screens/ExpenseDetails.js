import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { getExpenses, getTripDestinationById } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class ExpenseDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expense : this.props.navigation.state.params.expense, trip : ""};
		this.fetchData = this.fetchData.bind(this);
	}
    componentWillMount()
    {
        this.fetchData().done();
	}

    async fetchData()
    {
        try
        {
            var trip = await getTripDestinationById(this.state.expense.trip_id);
            console.log(trip)
            if(!trip)
            {
                Alert.alert("Oops, something went wrong :(");
            }
            else
            {
                this.setState({trip : trip});
            }
        }
        catch(error)
        {
            alert(error);
        }
    }

	render() {
		var { navigate } = this.props.navigation;
        return (
		<Image source={require('../images/expense-background.png')} style={styles.container}>
			<Text style={styles.header}>Extra information</Text>
            <View>
                <View>
                    <Text style={styles.buttonViewText}>Trip: {this.state.trip}</Text>
                    <Text style={styles.buttonViewText}>{this.state.expense.amount}{this.state.expense.currency}</Text>
                    <Text style={styles.buttonViewText}>{this.state.expense.date}</Text>
                    <Text style={styles.buttonViewText}>Category: {this.state.expense.category}</Text>
                    <Text style={styles.buttonViewText}>Reason: {this.state.expense.reason}</Text>
                    <Text style={styles.buttonViewText}>Sender: {this.state.expense.sender_id}</Text>
                    <Text style={styles.buttonViewText}>Receiver: {this.state.expense.target_id}</Text>

                </View>
            </View>
		</Image>
    );
  }
}