import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown } from 'react-native';
import OurPicker from '../view/OurPicker.js';


const util = require("util");

export default class AddExpense extends React.Component {

  render() {
    return (
      <Image source={require('../images/expense-background.png')} style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.header}>Add an Expense</Text>
        </View>
        <View style={styles.navbar}>
        <Text style={styles.entryText}>Category</Text>
          <OurPicker values={["Option 1","Option 2"]}/>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    fontSize:48,
    fontWeight: 'bold'
  },
  entryText : {
    fontSize:36
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
  }
});
