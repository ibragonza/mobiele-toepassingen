import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView} from 'react-native';
import {CreateParticipantJSON} from '../model/JSONTransformer'
const util = require("util");

export default class FirstScreen extends React.Component {
	render() {
	var {navigate} = this.props.navigation;
	var trip = [];
	for(let i = 0; i < 15; i++)
	{
		trip.push(
			<TouchableHighlight style={styles.button} onPress={() => Alert.alert("Hallo")}>
				<View>
					<Text style={styles.buttonText}>Naam Reis</Text>
					<Text> Datum XX/XX/XX</Text>
				</View>
			</TouchableHighlight>)
	}
    return (
		<ScrollView contentContainerstyle={styles.navbar}>
			{trip}
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
  },
  button : 
  {
	marginBottom : 10,
	borderRadius : 3,
	backgroundColor: 'green',
	width : 200,
	marginLeft: 'auto',
	marginRight: 'auto',
  }
});