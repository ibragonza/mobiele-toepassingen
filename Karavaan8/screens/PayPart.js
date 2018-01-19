import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, Image, TextInput, AsyncStorage } from 'react-native';
import { getTripDestinationById, payAmount } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class ExpenseDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expense : this.props.navigation.state.params.expense, trip : "", payCurrency : "EUR",amount:0,amount_left:0};
        this.fetchData = this.fetchData.bind(this);
        this.pay = this.pay.bind(this);
	}
    componentWillMount()
    {
        this.fetchData().done();
        this.getPreferredCurrency().done();
    }
    
    refresh(){
        this.fetchData();
    }

    async getPreferredCurrency(){
        const cur = await AsyncStorage.getItem('@Store:currency');
        this.setState({payCurrency:cur});
    }

    async pay(){
        if(this.state.amount > this.state.amount_left){
            Alert.alert("We know","You're generous ... but you're paying too much!");
        }else{
            try{
                if(!isNaN(parseFloat(this.state.amount)) || parseFloat(this.state.amount) <= 0){
                    await payAmount(this.state.expense.expense_id,this.state.amount,this.state.payCurrency);
                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                }else{
                    alert("You did not enter a number, dummy!");
                }  
            }catch(e){
                console.log(e);
            }
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
			<Text style={styles.header}>Partially Pay</Text>
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
                    <Text style={styles.buttonViewTextExpense}>{this.state.expense.amount} {this.state.expense.currency}</Text>
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
            <Text style={styles.entryText}>Pay Amount (in {this.state.payCurrency})</Text>
                    <TextInput
                        style={styles.chosenText}
                        editable = {true}
						keyboardType = 'numeric'
						onChangeText={(value) => this.setState({amount : value})}
                    />
            <TouchableHighlight style={styles.addButton} onPress={() => this.pay() }>
                    <View>
                        <Text style={styles.buttonText}>PAY</Text>
                    </View>
            </TouchableHighlight>
		</Image>
    );
  }
}