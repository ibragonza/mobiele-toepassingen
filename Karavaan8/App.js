import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {StackNavigator} from 'react-navigation'; 
import FirstScreen from './screens/FirstScreen'
import SecondScreen from './screens/SecondScreen'

const Navigation = StackNavigator({
	First:{screen: FirstScreen},
	Second : {screen: SecondScreen}
});
export default Navigation;