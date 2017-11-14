import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight } from 'react-native';
import { CreateParticipantJSON } from '../model/JSONTransformer'
const util = require("util");

export default class FirstScreen extends React.Component {
  render() {
    var { navigate } = this.props.navigation;
    return (
      <View style={styles.navbar}>
            <TouchableHighlight style={styles.button} onPress={() => navigate("Second", {})} title="Best"><Text style={styles.buttonText}>Test</Text></TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => navigate("Second", {})} title="Best"><Text style={styles.buttonText}>Test</Text></TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => navigate("Second", {})} title="Best"><Text style={styles.buttonText}>Test</Text></TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => navigate("Second", {})} title="Best"><Text style={styles.buttonText}>Test</Text></TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent : 'center'
  },
  button :{
    backgroundColor:"skyblue",
    margin:20,
    width:300,
    height:100,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto'
  },
  buttonText:{
    fontSize:48,
  },
  container:
  {
    flex: 1,
  },
  article:
  {
    flex: 10,
  }
});
