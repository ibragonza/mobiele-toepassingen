import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, ScrollView, ImageBackground, TextInput, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import { CreateTripJSON, getTrips, getUsersCurrency } from '../model/JSONUtils'
import { getAllCurrencies } from '../model/Converter'
import styles from './styles.js'

export default class AddTripScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { trip_id: "", destination: "", start_date: "", end_date: "", trip_currency: "", currencies: [], loaded: false, userscurrency: [] };
		this.fetchData = this.fetchData.bind(this);
		this.send = this.send.bind(this);
	}

	componentDidMount() {
		this.fetchData().done();
	}

	async fetchData() {
		const allCurrencies = await getAllCurrencies();
		this.setState({ currencies: allCurrencies });
		const usersCurrency = await getUsersCurrency();
		this.setState({ userscurrency: usersCurrency });
		this.setState({ trip_currency: usersCurrency })
		this.setState({ loaded: true });
	}

	async send() {
		var { navigate } = this.props.navigation;
		if (this.state.destination == "") {
			Alert.alert("The Destination cannot be zero");
		}
		else {
			var result =
				{
					destination: this.state.destination,
					start_date: this.state.start_date,
					end_date: this.state.end_date,
					trip_id: "0",
					trip_currency: this.state.trip_currency
				};
			try {
				var setResult = await CreateTripJSON(result.trip_id, result.destination, result.start_date, result.end_date, result.trip_currency);
				if (!setResult) {
					Alert.alert("Oops, something went wrong :(");
				} else
					this.props.navigation.state.params.onGoBack();
					this.props.navigation.goBack();
			}
			catch (error) {
				console.log(error);
			}
		}
	}
	render() {
		if (!this.state.loaded) {
			return false;
		}
		else {
			var { navigate } = this.props.navigation;
			const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
			const tableData = [['1', '2', '3', '4'], ['a', 'b', 'c', 'd']];
			return (
				<Image source={require('../images/addTrip.jpg')} style={styles.container}>
					<View style={styles.navbar}>
						<Text style={styles.header}>Add a trip</Text>

						<Text style={styles.entryText}>BESTEMMING</Text>
						<TextInput style={styles.textInput} onChangeText={(destination) => this.setState({ destination })} value={this.state.destination} />

						<Text style={styles.entryText}>STARTDATUM</Text>
						<DatePicker style={styles.date} date={this.state.start_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
							onDateChange={(date) => { this.setState({ start_date: date }) }} customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />

						<Text style={styles.entryText}>EINDDATUM</Text>
						<DatePicker style={styles.date} date={this.state.end_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
							onDateChange={(date) => { this.setState({ end_date: date }) }} customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />

						<Text style={styles.entryText}>Default currency for trip</Text>
						<ModalDropdown options={this.state.currencies} style={styles.Modal} dropdownStyle={styles.dropdown} dropdownTextStyle={styles.dropdownTextStyle} textStyle={styles.dropdownText} defaultIndex={0} defaultValue={this.state.trip_currency}
							onSelect={(idx, value) => this.setState({ trip_currency: value })} />

						<TouchableHighlight style={styles.addButton} onPress={this.send}>
							<Text>VOEG TOE</Text>
						</TouchableHighlight>
					</View>
				</Image>
			);
		}
	}
}