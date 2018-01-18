import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image,ScrollView} from 'react-native';
import styles from './styles.js'

const util = require("util");

export default class FirstScreen extends React.Component {
  render() {
    var { navigate } = this.props.navigation;
    return (
      <Image source={require('../images/index-background.png')} style={styles.container}>
		<ScrollView>
        <View style={styles.navbarF}>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Trips", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/trip.png')} style={styles.icon} /><Text style={styles.buttonTextF}>Trips</Text></View></TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate("People", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/person.png')} style={styles.icon} /><Text style={styles.buttonTextF}>People</Text></View></TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Expenses", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/expenses.png')} style={styles.icon} /><Text style={styles.buttonTextF}>Expenses</Text></View></TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Settings", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/settings.png')} style={styles.icon} /><Text style={styles.buttonTextF}>Settings</Text></View></TouchableHighlight>
        </View>
		</ScrollView>
      </Image>
    );
  }
}