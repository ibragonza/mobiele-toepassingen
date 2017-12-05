import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, Image } from 'react-native';
import { createExpenseJSON } from '../model/JSONUtils';
const util = require("util");

export default class FirstScreen extends React.Component {
  render() {
    var { navigate } = this.props.navigation;
    return (
      <Image source={require('../images/index-background.png')} style={styles.container}>
        <View style={styles.navbar}>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Trips", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/trip.png')} style={styles.icon} /><Text style={styles.buttonText}>Trips</Text></View></TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Second", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/person.png')} style={styles.icon} /><Text style={styles.buttonText}>People</Text></View></TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Expenses", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/expenses.png')} style={styles.icon} /><Text style={styles.buttonText}>Expenses</Text></View></TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate("Settings", {})} title="Best"><View style={styles.buttonImage}><Image source={require('../images/settings.png')} style={styles.icon} /><Text style={styles.buttonText}>Settings</Text></View></TouchableHighlight>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#D5DCC1",
    margin: 20,
    width: 300,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A2A794',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonText: {
    fontSize: 48,
    marginLeft: 10,
    color:'#656A58'
  },
  buttonImage: {
    flexDirection: 'row'
  },
  container:
  {
    flex: 1,
  },
  article:
  {
    flex: 10,
  },
  icon: {
    height: 40,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  container:{
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
