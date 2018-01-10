import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import { createPerson, getPersons } from '../model/JSONUtils'

const util = require("util");

export default class AddPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name:"", email:""};
		this.addPerson = this.addPerson.bind(this);
        //this.fetchPersons = this.fetchPersons.bind(this);
    }
	/*
    componentDidMount() {
        this.fetchPersons().done();
    }
	*/
	async addPerson()
	{
		try
		{
			var setPerson = await createPerson(this.state.name, this.state.email);
			if(!setPerson){
				Alert.alert("Oops, something went wrong :(");
			}
			else
			{
			     this.props.navigation.navigate("People");
			}
		}
		catch(error)
		{
			alert(error);
		}
	}

    render() {
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Add a Person</Text>
                    <Text style={styles.entryText}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        editable={true}
						onChangeText={(text) => this.setState({name:text})} defaultValue={this.state.name}
                    />
                    <Text style={styles.entryText}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        editable={true}
                        onChangeText={(text) => this.setState({email:text})} defaultValue={this.state.email}
                    />
                </View>
                <TouchableHighlight style={styles.addExpensebutton} onPress={() => this.addPerson()} >
                    <View>
                        <Text style={styles.buttonText}>CREATE PERSON</Text>
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
  header:
  {
	fontSize: 48,
	fontWeight: 'bold'
  },
    entryText: {
        fontSize: 24
    },
    navbar: {
        flex: 1,
        marginTop: 40,
    },
  textInput : 
  {
	color : 'red',
	fontSize : 24,
  },
    navbarText:
        {
            fontSize: 20,
        },
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addExpensebutton:
        {
            marginTop: 5,
            marginBottom: 10,
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
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
        }
});
