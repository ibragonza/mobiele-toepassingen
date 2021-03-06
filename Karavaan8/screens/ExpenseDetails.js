import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image } from 'react-native';
import { getTripDestinationById, setPaid } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class ExpenseDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expense : this.props.navigation.state.params.expense, trip : "",amount_left:0};
        this.fetchData = this.fetchData.bind(this);
        this.pay = this.pay.bind(this);
	}
    componentWillMount()
    {
        this.fetchData().done();
    }
    
    refresh(){
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    }


    async pay(){
        try{
            await setPaid(this.state.expense.expense_id);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        }catch(e){
            console.log(e);
        }
    }
    async fetchData()
    {
        var amount = this.state.expense.amount;
        var paid = this.state.expense.amount_paid;
        var left = amount - paid;
        this.setState({amount_left:left});

        try
        {
            var trip = await getTripDestinationById(this.state.expense.trip_id);
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
            <View style={styles.buttonContainer}>
                <View style={styles.buttonViewExpense}>
                    <Text style={styles.buttonViewTextExpense}>Trip:</Text>
                    <Text style={styles.buttonViewTextExpense}>Amount:</Text>
                    <Text style={styles.buttonViewTextExpense}>Date</Text>
                    <Text style={styles.buttonViewTextExpense}>Category:</Text>
                    <Text style={styles.buttonViewTextExpense}>Reason:</Text>
                    <Text style={styles.buttonViewTextExpense}>Sender:</Text>
                    <Text style={styles.buttonViewTextExpense}>Receiver:</Text>
                    <Text style={styles.buttonViewTextExpense}>Paid:</Text>
                    <Text style={styles.buttonViewTextExpense}>Amount Paid:</Text>
                    <Text style={styles.buttonViewTextExpense}>Amount Left:</Text>
                </View>
                <View style={styles.buttonViewExpense}>
                    <Text style={styles.buttonViewTextExpense}>{this.state.trip}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.amount}{this.state.expense.currency}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.date}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.category}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.reason}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.sender_id}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.target_id}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.paid}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.amount_paid} {this.state.expense.currency}</Text>
                    <Text style={styles.buttonViewTextExpense}>{this.state.amount_left} {this.state.expense.currency}</Text>
                </View>
            </View>
            <TouchableHighlight style={styles.addButton} onPress={() => this.pay() }>
                    <View>
                        <Text style={styles.buttonText}>SET PAID</Text>
                    </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.addButton} onPress={() => navigate("PayPart",{expense : this.state.expense,onGoBack: () => this.refresh()}) }>
                    <View>
                        <Text style={styles.buttonText}>PAY PART</Text>
                    </View>
            </TouchableHighlight>
		</Image>
    );
  }
}