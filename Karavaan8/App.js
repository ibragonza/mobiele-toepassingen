import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {StackNavigator} from 'react-navigation'; 
import FirstScreen from './screens/FirstScreen'
import ExpensesScreen from './screens/ExpensesScreen'
import TripScreen from './screens/TripScreen'
import AddTripScreen from './screens/AddTripScreen'
import SettingsScreen from './screens/SettingsScreen'
import PeopleScreen from './screens/PeopleScreen'
import AddExpense from './screens/AddExpense'
import AddPerson from './screens/AddPerson'
import TransferMoney from './screens/TransferMoney'

const Navigation = StackNavigator({
	First:{screen: FirstScreen},
	Expenses : {screen: ExpensesScreen},
	Trips : {screen : TripScreen},
	AddTrip : {screen : AddTripScreen},
	Settings :{screen: SettingsScreen},
	People : {screen : PeopleScreen},
	AddExpense : {screen: AddExpense},
	AddPerson : {screen: AddPerson},
	TransferMoney : {screen: TransferMoney}
});
export default Navigation;