import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableHighlight,Image,TextInput,Picker,AsyncStorage} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {getAllCurrencies} from '../model/Converter'
import styles from './styles.js'

const util = require("util");

export default class SettingsScreen extends React.Component {
	constructor(props) {
	super(props);
	this.state = {currency : "EUR", currencies: [], name: "Vogels",loaded : false,disabled : true};
	this.fetchData = this.fetchData.bind(this);
	this.confirmSettings = this.confirmSettings.bind(this);
	}
	
componentDidMount()
  {
	this.fetchData().done();
  }
  
  async fetchData()
  {
	try
	{
		const cur = await AsyncStorage.getItem('@Store:currency');
		const na = await AsyncStorage.getItem('@Store:name');
		const currenc = await getAllCurrencies();
		this.setState({name : na});
		this.setState({currency:cur});
		this.setState({currencies:currenc});
		this.setState({loaded : true});
	}
	catch(error)
	{
		alert(error);
	}
  }
  async confirmSettings()
  {
	try
	{
		await AsyncStorage.setItem('@Store:currency',this.state.currency);
		await AsyncStorage.setItem('@Store:name', this.state.name);
		if(this.state.name == "Philip J Fry")
		{
			this.props.navigation.navigate("DeveloperScreen");
		}
		else
		{
			this.props.navigation.navigate("First");
		}
	}
	catch(error)
	{
		console.log(error);
	}
  }
  render() {
	if(!this.state.loaded)
	{
		return false;
	}
	else
	{
    return (
      <Image source={require('../images/settings-background.jpg')} style={styles.container}>
	<View style={styles.navbar}>
		<Text style={styles.header}>Settings</Text>
		<Text style={styles.entryText}>Default Currency</Text>
		<ModalDropdown options={this.state.currencies} style={styles.Modal} dropdownStyle={styles.dropdown} dropdownTextStyle={styles.dropdownTextStyle} textStyle={styles.dropdownText} defaultIndex={0} defaultValue={this.state.currency}
		onSelect ={(idx,value) => this.setState({currency : value}) }/>
		<Text style={styles.entryText}>Name</Text>
			<TextInput style={styles.textInput} editable={true}  onChangeText={(text) => this.setState({name:text})} defaultValue={this.state.name}/>
		<TouchableHighlight style={styles.addButton} onPress={() => this.confirmSettings()}>
			<View>
				<Text style={styles.buttonText}>Confirm</Text>
			</View>
		</TouchableHighlight>
    </View>
    </Image>
    );
	}
  }
}
/*
const styles = StyleSheet.create({
  header:
  {
	fontSize: 48,
	fontWeight: 'bold'
  },
  entryText:
  {
		marginTop : 20,
		fontSize: 24
  },
  textInput:
  {
	backgroundColor : 'white',
	color : 'red',
	marginTop : 10,
	fontSize: 20,
  },
  confirmButton:
  {
	marginTop: 15,
	borderRadius: 3,
	width: 200,
	height: 70,
	marginLeft: 'auto',
	marginRight: 'auto',
	backgroundColor: '#00FF7F',
	justifyContent: 'center',
	alignItems: 'center',
  },
  buttonText: {
	fontSize: 24,
	color:'white',
	marginLeft : 10
  },
  navbar: 
  {
	flex: 1,
	marginTop: 40,
  },
  navbarText:
  {
	fontSize:20,
  },
  container:
  {
	flex: 1,
	width: undefined,
	height: undefined,
	backgroundColor:'transparent',
	justifyContent: 'center',
	alignItems: 'center',
  },
  Modal :
  {
	width: 200,
	height: 50,
  },
  dropdown : 
  {
	backgroundColor: "#d3d3d3",
	width: 200,
	borderWidth: 2,
	borderColor: '#A2A794'
  },
  dropdownTextStyle:
  {
	color:'red',
	backgroundColor:'#b3b3b3'
  },
  dropdownText : 
  {
	color : 'red',
	fontSize: 24,
  },
});
*/