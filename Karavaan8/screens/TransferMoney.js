import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import { createExpenseJSON, getTrips } from '../model/JSONUtils'


const util = require("util");

export default class TransferMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '',
                        paidTo: '',
                        date: "",
                        currency: "",
                        amount: ""};
    }

    render() {
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Register Money Transfer</Text>

                    <Text style={styles.entryText}>Your username</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
                        keyboardType = 'default'
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />

                    <Text style={styles.entryText}>Target username</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
                        keyboardType = 'default'
                        onChangeText={(paidTo) => this.setState({paidTo})}
                        value={this.state.paidTo}
                    />

                    <Text style={styles.entryText}>Amount</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
						keyboardType = 'numeric'
                        onChangeText={(amount) => this.setState({amount})}
                        value={this.state.amount}
                    />

                    <OurPicker values={["USD", "YEN", "EURO"]} defaultVal={"EURO"} />
                    <Text style={styles.entryText}>Date</Text>
                    <DatePicker
                        style={styles.date}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={
                            (date) =>
                            {
                                this.setState({
                                    date: date
                                })
                            }
                        }
                        customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />
                </View>
                <TouchableHighlight style={styles.transferMoneyButton} /*onPress={() => navigate("TransferMoney", {})}*/>
                    <View>
                        <Text style={styles.buttonText}>TRANSFER MONEY</Text>
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    entryText: {
        fontSize: 24
    },
    navbar: {
        flex: 1,
        marginTop: 40,
    },
    navbarText:
        {
            fontSize: 20,
        },
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transferMoneyButton:
        {
            marginTop: 5,
            marginBottom: 10,
            borderRadius: 3,
            width: 200,
            height: 70,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#00FF7F',
            justifyContent: 'center',
            alignItems: 'center',
        },
    buttonText:
        {
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
        }
});
