import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput,ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { createExpense, getTrips, getPersons, getCategories, getUsersCurrency } from '../model/JSONUtils'
import { getAllCurrencies, convert } from '../model/Converter'
import ModalDropdown from 'react-native-modal-dropdown';
import styles from './styles.js'

const util = require("util");

export default class AddExpense extends React.Component {
    constructor(props) {
        super(props);
		console.disableYellowBox = true;
        this.state = {person0 : [], person1 : [], person2 : [], person3 :[], person4 : [],value0 : 0,value1:0, value2:0, value3:0,value4:0,trip: "", expense_date: "", trips:[], people : [], currencies:[], reason:"", categories : [], category:"FOOD", loaded:false, currency: ""};
		this.fetchData = this.fetchData.bind(this);
		this.setName = this.setName.bind(this);
		this.setAmount = this.setAmount.bind(this);
    }

    componentWillMount() {
        this.fetchData().done();
    }
	async addExpense()
	{
		var participants = [];
		var amounts = [];
		try
		{
			var errorMessage = "Please fill in the : ";
            var bool = true;
			if(this.state.trip == "")
			{
                bool = false;
				errorMessage += " Trip,";
			}
			if(this.state.expense_date == "")
			{
                bool = false;
				errorMessage += " Date,";
			}
			if(this.state.amount == "")
			{
                bool = false;
				errorMessage += " Amount,";
			}
			if(this.state.reason == "")
			{
                bool = false;
				errorMessage + " Reason,";
			}
			if(this.state.person1 == "" && this.state.value1 == "" || isNaN(parseInt(this.state.value1)))
			{
				bool = false;
			}
			else
			{
				participants.push(this.state.person1);
				amounts.push(this.state.value1);
			}
			if(this.state.person2 == "" && this.state.value2 == "" || isNaN(parseInt(this.state.value2)))
			{
				bool = false;
			}
			else {
				participants.push(this.state.person2);
				amounts.push(this.state.value2);
			}
			if(this.state.person3 == "" && this.state.value3 == "" || isNaN(parseInt(this.state.value3)))
			{
				bool = false;
			}
			else {
				participants.push(this.state.person3);
				amounts.push(this.state.value3);
			}
			if(this.state.person4 == "" && this.state.value4 == "" || isNaN(parseInt(this.state.value4)))
			{
				bool = false;
			}
			else {
				participants.push(this.state.person4);
				amounts.push(this.state.value4);
			}
            if(bool){
				console.log(participants);
				console.log(amount);
				for (var i = 0; i < participants; i++)
				{
					var am = await convert(amounts[i],this.state.currency);
					var result = 
					{
						person : this.state.person0.person_id,
						target : participants[i].person_id,
						trip : this.state.trip.trip_id,
						expense_date : this.state.expense_date,
						category : this.state.category,
						currency : this.state.currency,
						amount : am,
						reason : this.state.reason,
					}
				var setResult = await createExpense(result.person,result.target,result.trip,result.amount,result.currency,result.expense_date,result.category, result.reason)
				if(!setResult)
				{
					alert("Oops, something went wrong :(");
				}
				else
				{
					console.log("succes");
				}
				}
				this.props.navigation.state.params.onGoBack();
				this.props.navigation.goBack();
			}
			else
			{
				errorMessage = errorMessage.substring(0, errorMessage.length - 1);
				alert(errorMessage);
			}
		}
		catch(error)
		{
			console.log(error);
		}
	}
    async fetchData() {
		try
        {
			this.setState({categories : getCategories()});
			this.setState({currencies : await getAllCurrencies()});
		    const usersCurrency = await getUsersCurrency();
			this.setState({currency: usersCurrency})
            var setPerson = await getPersons();
            if(!setPerson)
            {
                console.log("Oops, something went wrong :(");
            }
            else
            {
                this.setState({people : setPerson});
            }
			const t = await getTrips();
			this.setState({trips : t});
        }

        catch(error)
        {
            console.log(error);
        }
		this.setState({loaded : true});
  }
  setName(id,naam)
  {
	if(id == "person0")
	{
		this.setState({person0 : naam});
	}
	if(id == "person1")
	{
		this.setState({person1 : naam});
	}
	if(id == "person2")
	{
		this.setState({person2 : naam});
	}
	if(id == "person3")
	{
		this.setState({person3 : naam});
	}
	if(id == "person4")
	{
		this.setState({person4 : naam});
	}
  }
  setAmount(id,value)
  {
	if(id == "value0")
	{
		this.setState({value0 : value});
	}
	if(id == "value1")
	{
		this.setState({value1 : value});
	}
	if(id == "value2")
	{
		this.setState({value2 : value});
	}
	if(id == "value3")
	{
		this.setState({value3 : value});
	}
	if(id == "value4")
	{
		this.setState({value4 : value});
	}
  }
    render() {
		if(!this.state.loaded)
		{
			return false;
		}
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
			<ScrollView>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Split Expense</Text>
                    <ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
						renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        onSelect ={(idx,value) => this.setName("person0",value) }
                        value={this.state.person0.name}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.person0.name}</Text>
                    </ModalDropdown>
					<Text style={styles.entryText}>Amount</Text>
					<TextInput
					style={styles.chosenText}
					editable = {true}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setAmount("value0",value)}
                    />
					<ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
						renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        onSelect ={(idx,value) => this.setName("person1",value) }
                        value={this.state.person1.name}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.person1.name}</Text>
                    </ModalDropdown>
					<Text style={styles.entryText}>Amount</Text>
					<TextInput
					style={styles.chosenText}
					editable = {true}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setAmount("value1",value)}
                    />
					<ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
						renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        onSelect ={(idx,value) => this.setName("person2",value) }
                        value={this.state.person1.name}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.person2.name}</Text>
                    </ModalDropdown>
					<Text style={styles.entryText}>Amount</Text>
					<TextInput
					style={styles.chosenText}
					editable = {true}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setAmount("value2",value)}
                    />
					<ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
						renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        onSelect ={(idx,value) => this.setName("person3",value) }
                        value={this.state.person1.name}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.person3.name}</Text>
                    </ModalDropdown>
					<Text style={styles.entryText}>Amount</Text>
					<TextInput
					style={styles.chosenText}
					editable = {true}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setAmount("value3",value)}
                    />
					<ModalDropdown style={styles.Modal}
						dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
						renderRow={this._person_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._person_renderSeparator(rowID)}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        onSelect ={(idx,value) => this.setName("person4",value) }
                        value={this.state.person1.name}>
                    <Text style={styles.chosenText}>Tap to choose: {this.state.person4.name}</Text>
                    </ModalDropdown>
					<Text style={styles.entryText}>Amount</Text>
					<TextInput
					style={styles.chosenText}
					editable = {true}
					keyboardType = 'numeric'
					onChangeText={(value) => this.setAmount("value4",value)}
					/>
<Text style={styles.entryText}>Link to trip</Text>
					<ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.dropdownText}
                        options={this.state.trips}
                        renderRow={this._trip_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._trip_renderSeparator(rowID)}
                        onSelect ={(idx,value) => this._handleChooseTrip(value)}
						value={this.state.trip.trip_id}>

                    <Text style={styles.chosenText}>Tap to choose: {this.state.trip.destination}</Text>
                    </ModalDropdown>
					<Text style={styles.entryText}>Currency</Text>
					<ModalDropdown options={this.state.currencies}
                        style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.chosenText}
					    defaultValue={this.state.currency}
					    onSelect ={(idx,value) => this._handleChooseCurrency(value)}/>

					<Text style={styles.entryText}>Category</Text>
                    <ModalDropdown options={this.state.categories} style={styles.Modal} dropdownStyle={styles.dropdown} dropdownTextStyle={styles.dropdownTextStyle} textStyle={styles.chosenText}
                    defaultIndex={0} defaultValue={this.state.category}
					onSelect ={(idx,value) => this.setState({category : value})}/>

                    <Text style={styles.entryText}>Reason</Text>
                    <TextInput
                        style={styles.chosenText}
                        keyboardType='numeric'
                        editable={true} onChangeText={(text) => this.setState({reason:text})}
                    />
                    <Text style={styles.entryText}>Date</Text>
                    <DatePicker style={styles.date} date={this.state.expense_date} mode="date" placeholder="select date" format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ expense_date: date }) }} customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />
                </View>
                <TouchableHighlight style={styles.addButton} onPress={() => this.addExpense() }>
                    <View>
                        <Text style={styles.buttonText}>ADD EXPENSE</Text>
                    </View>
                </TouchableHighlight>
			</ScrollView>
            </Image>
        );
		}
    _trip_renderRow(rowData){
        return (
              <Text style={styles.chosenText}>
                {`${rowData.destination}`}
              </Text>
            );
    }

    _trip_renderSeparator(rowID){
        let key = `spr_${rowID}`;
        return (<View key={key.trip_id} />);
    }
	_person_renderRow(rowData){
        return (
              <Text style={styles.chosenText}>
                {`${rowData.name}`}
              </Text>
            );
    }
    _person_renderSeparator(rowID){
        let key = `spr_${rowID}`;
        return (<View key={key.name} />);
    }

    _handleChooseTrip(value)
    {
        this.setState({trip : value})
        this._updateDefaultTripCurrency(value.trip_currency)
    }

    _updateDefaultTripCurrency(currency)
    {
        this.setState({currency : currency})
    }

    _handleChooseCurrency(currency){
        this.setState({currency : currency})
    }
}