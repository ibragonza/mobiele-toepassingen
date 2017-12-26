import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import { createExpenseJSON, getTrips,removeTrip } from '../model/JSONUtils'


const util = require("util");

export default class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myNumber: '0', start_date: "", end_date: "",trips:[], target : "",currency:"",value:"",date:"",reason:"",category:"" };
        this.fetchTrips = this.fetchTrips.bind(this);
    }

    componentDidMount() {
        this.fetchTrips().done();
    }

    async fetchTrips() {
		console.log("FetchData too");
		const trips = await getTrips();
		const TripA = [];
		for(var key in trips){
			TripA.push({
				destination : trips[key].destination
			})
		}
		this.setState({trips : TripA});
  }

    render() {
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Add an Expense</Text>
                    <Text style={styles.entryText}>Link to trip</Text>
                    <OurPicker values={["Barcelona", "Tremelo", "Moscow"]} defaultVal={"Tremelo"} />
                    <Text style={styles.entryText}>Amount</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
						keyboardType = 'numeric'
                    />
                    <OurPicker values={["USD", "YEN", "EURO"]} defaultVal={"EURO"} />
                    <Text style={styles.entryText}>Category</Text>
                    <OurPicker values={["Option 1", "Option 2"]} defaultVal={"Option 1"} />
                    <Text style={styles.entryText}>Description</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        editable={true}
                    />
                    <Text style={styles.entryText}>Date</Text>
                    <DatePicker style={styles.date} date={this.state.start_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ start_date: date }) }} customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />
                </View>
                <TouchableHighlight style={styles.addExpensebutton} onPress={() => navigate("AddExpense", {})}>
                    <View>
                        <Text style={styles.buttonText}>ADD EXPENSE</Text>
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 48,
        fontWeight: 'bold'
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
    addExpensebutton:
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
