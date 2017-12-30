import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableHighlight,Image,TextInput,Picker,AsyncStorage} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const util = require("util");

export default class SettingsScreen extends React.Component {
	constructor(props) {
	super(props);
	this.state = {currency : "", values: ["EURO","YEN"], name: "Jansen"};
	this.setup = this.setup.bind(this);
	this.confirmSettings = this.confirmSettings.bind(this);
	}
	
componentDidMount()
  {
	this.setup().done();
  }
  
  async setup()
  {
	try
	{
		const cur = await AsyncStorage.getItem('@Store:currency');
		const na = await AsyncStorage.getItem('@Store:name');
		if(cur !== null)
		{
			this.setState({name : na});
			this.setState({currency:cur});
		}
		else
		{
			this.setState({currency:"EURO"});
		}
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
		this.props.navigation.navigate("First");
	}
	catch(error)
	{
		alert(error);
	}
  }
  render() {
	if(this.state.currency == "")
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
		<ModalDropdown options={this.state.values} style={styles.Modal} dropdownStyle={styles.dropdown} dropdownTextStyle={styles.dropdownTextStyle} textStyle={styles.dropdownText} defaultIndex={0} defaultValue={this.state.currency}
		onSelect ={(idx,value) => this.setState({currency : value}) }/>
		<Text style={styles.entryText}>Name</Text>
			<TextInput style={styles.textInput} editable={true}  onChangeText={(text) => this.setState({name:text})} defaultValue={this.state.name}/>
		<TouchableHighlight style={styles.addExpensebutton} onPress={() => this.confirmSettings()}>
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

const styles = StyleSheet.create({
  header: {
	fontSize: 48,
	fontWeight: 'bold'
  },
  entryText: {
		marginTop : 20,
		fontSize: 24
  },
  textInput:
  {
	backgroundColor : 'white',
	marginTop : 10,
	fontSize: 20,
  },
  addExpensebutton:
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
	buttonText:
	{
		color : 'white',
		fontSize : 15,
	},
  navbar: {
    flex: 1,
	marginTop: 40,
  },
  navbarText:
  {
	  fontSize:20,
  },
  container:{
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal : {
    //backgroundColor: "#b3b3b3",
    width: 200,
    height: 50,
    //borderWidth: 1,
    //borderColor: 'black'
  },
  dropdown : {
    backgroundColor: "#d3d3d3",
    width: 200,
    borderWidth: 2,
    borderColor: '#A2A794'
  },
  buttonText: {
    fontSize: 24,
    color:'white',
    marginLeft : 10
  },
  dropdownTextStyle:{
    color:'red',
    backgroundColor:'#b3b3b3'

  },
  dropdownText : 
  {
	color : 'red',
	fontSize: 24,
  },
});
