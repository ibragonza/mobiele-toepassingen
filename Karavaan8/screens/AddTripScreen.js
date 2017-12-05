import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight,ScrollView,ImageBackground, TextInput} from 'react-native';
import { createExpenseJSON } from '../model/JSONUtils'
import DatePicker from 'react-native-datepicker'
const util = require("util");

export default class AddTripScreen extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = { text: 'SChrijf hier je bestemming !!!!!!!', date:"2016-05-15"};
	}
	
	render() {
	var {navigate} = this.props.navigation;
	return (
		<ScrollView style={styles.navbar}>
			<TouchableHighlight style={styles.addTripbutton} onPress={() => Alert.alert("Hallo")}>
				<View>
					<Text>Bestemming</Text>
					<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(text) => this.setState({text})}value={this.state.text}/>
					
					<Text>StartDatum</Text>
					<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(text) => this.setState({text})}value={this.state.text}/>
					
					<Text>EindDatum</Text>
					<DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
				</View>
			</TouchableHighlight>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	
});