import React from 'react';
import { StyleSheet, Picker } from 'react-native';
const util = require("util");
import ModalDropdown from 'react-native-modal-dropdown';

export default class OurPicker extends React.Component {
  render() {
    return (
      <ModalDropdown options={this.props.values} style={styles.Modal} dropdownStyle={styles.dropdown} dropdownTextStyle={styles.dropdownTextStyle} textStyle={styles.buttonText} defaultIndex={0} defaultValue={"Option 1"}/>
    );
  }
}


const styles = StyleSheet.create({
  Modal : {
    backgroundColor: "#b3b3b3",
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: '#A2A794'
  },
  dropdown : {
    backgroundColor: "#d3d3d3",
    width: 200,
    borderWidth: 2,
    borderColor: '#A2A794'
  },
  buttonText: {
    fontSize: 32,
    color:'#656A58',
    marginLeft : 10
  },
  dropdownTextStyle:{
    color:'red',
    backgroundColor:'#b3b3b3'

  }
});