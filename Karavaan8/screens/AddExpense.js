import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput,ScrollView } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import { createExpenseJSON, getTrips,removeTrip } from '../model/JSONUtils'


const util = require("util");

export default class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myNumber: '0', expense_date: "",trips:[], target : "",currency:"",amount:"",date:"",reason:"",category:"",loaded:"" };
		const tripsync =  [{"trip_id" : "01", "destination":"Barcelona"},{"trip_id":"02","destination":"Frankrijk"}];
		this.addExpense = this.addExpense.bind(this);
        this.fetchTrips = this.fetchTrips.bind(this);
    }

    componentWillMount() {
        this.fetchTrips().done();
    }
	addExpense()
	{
		//createExpenseJSON("01",
		console.log(this.state.amount);
		console.log(this.state.reason);
		console.log(this.state.expense_date);
		console.log(this.state.currency + " Currency");
		this.props.navigation.navigate("Expenses");
	}
    async fetchTrips() {
		/*
		const trips = await getTrips();
		const TripA = [];
		for(var key in trips){
			TripA.push({
				destination : trips[key].destination
			})
		}
		this.setState({trips : TripA});
		¨*/
		this.setState({loaded : "Not Empty"});
		this.setState({trips:this.tripsync});
  }

    render() {
		if(this.state.loaded == "")
		{
			return false;
		}
		else
		{
		console.log(JSON.stringify(this.state.trips));
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
			<ScrollView>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Add an Expense</Text>
                    <Text style={styles.entryText}>Link to trip</Text>
                    <OurPicker values={["USD", "YEN", "EURO"]} defaultVal={"EURO"}/>
                    <Text style={styles.entryText}>Amount</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
						keyboardType = 'numeric'
						onChangeText={(text) => this.setState({amount:text})}
                    />
					<Text style={styles.entryText}>Currency</Text>
                    <OurPicker values={["USD", "YEN", "EURO"]} defaultVal={"EURO"}
					onSelect ={(idx,value) => this.setState({currency : value}) }/>
                    <Text style={styles.entryText}>Category</Text>
                    <OurPicker values={["Option 1", "Option 2"]} defaultVal={"Option 1"} />
                    <Text style={styles.entryText}>Reason</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        editable={true} onChangeText={(text) => this.setState({reason:text})}
                    />
                    <Text style={styles.entryText}>Date</Text>
                    <DatePicker style={styles.date} date={this.state.start_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ expense_date: date }) }} customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />
                </View>
                <TouchableHighlight style={styles.addExpensebutton} onPress={() => this.addExpense() }>
                    <View>
                        <Text style={styles.buttonText}>ADD EXPENSE</Text>
                    </View>
                </TouchableHighlight>
			</ScrollView>
            </Image>
        );
		}
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
			marginTop: 20,
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
