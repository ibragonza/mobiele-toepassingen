import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground} from 'react-native';
import { * } from '../model/JSONUtils'
const util = require("util");

export default class AddTripScreen extends React.Component {
	render() {
	var {navigate} = this.props.navigation;
	return (
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => Alert.alert("Hallo")}>
				<View>
					<Text style={styles.buttonText}>ADD TRIP</Text>
				</View>
			</TouchableHighlight>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	
});