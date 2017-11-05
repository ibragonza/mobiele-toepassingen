import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableHighlight} from 'react-native';
const util = require("util");

export default class SecondScreen extends React.Component {
  render() {
    return (
	<View style={styles.navbar}>
		<Text>Test</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
	marginTop: 40,
  },
  navbarText:
  {
	  fontSize:20,
  },
});
