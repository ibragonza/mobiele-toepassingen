import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import { createExpense, getTrips,removeTrip,getPersons } from '../model/JSONUtils'

const util = require("util");

export default class ExpensesScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {person: "", target:"",trip: "", expense_date: "",trips:[], people : [],currency:"EURO",amount:"",reason:"",category:"ETEN",loaded:false };
        this.fetchData = this.fetchData.bind(this);
    }

	componentWillMount()
	{
		this.fetchData().done();
	}
	async fetchData()
	{
		
	}
  render() {
    var { navigate } = this.props.navigation;
    return (
      <Image source={require('../images/expense-background.png')} style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.header}>Expenses</Text>
        </View>
        <View style={styles.navbar}>
          <TouchableHighlight style={styles.button} onPress={() => navigate("AddExpense", {})}>
            <View>
              <Text style={styles.buttonText}>ADD EXPENSE</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    fontWeight: 'bold'
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
  button:
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
