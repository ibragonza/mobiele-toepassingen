import React from 'react';
import { StyleSheet, Picker } from 'react-native';
const util = require("util");
import ModalDropdown from 'react-native-modal-dropdown';

export default class OurPicker extends React.Component {
  render() {
    return (
      <ModalDropdown options={['option 1', 'option 2']} style={styles.Modal} dropdownStyle={styles.dropdown} textStyle={styles.buttonText} defaultIndex={0} defaultValue={"option 1"}/>
    );
  }
}


const styles = StyleSheet.create({
  Modal : {
    backgroundColor: "#D5DCC1",
    margin: 20,
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: '#A2A794'
  },
  dropdown : {
    backgroundColor: "#D5DCC1",
    width: 200,
    borderWidth: 2,
    borderColor: '#A2A794'
  },
  buttonText: {
    fontSize: 32,
    color:'#656A58'
  },
});