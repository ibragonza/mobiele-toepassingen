import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {StackNavigator} from 'react-navigation'; 
import FirstScreen from './screens/FirstScreen'
import ExpensesScreen from './screens/ExpensesScreen'
import TripScreen from './screens/TripScreen'

const Navigation = StackNavigator({
	First:{screen: FirstScreen},
	Expenses : {screen: ExpensesScreen},
	Trips : {screen : TripScreen}
});
export default Navigation;