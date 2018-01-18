import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as EmailValidator from 'email-validator';
import { createPerson } from '../model/JSONUtils'
import styles from './styles.js'

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
		    if(EmailValidator.validate(this.state.email)){
                var setPerson = await createPerson(this.state.name, this.state.email);
                if(!setPerson){
                    Alert.alert("Oops, something went wrong :(");
                }
                else
                {
                    this.props.navigation.state.params.onGoBack();
					this.props.navigation.goBack();
                }
            }else{
                Alert.alert("Email address is not valid")
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
                <TouchableHighlight style={styles.addButton} onPress={() => this.addPerson()} >
                    <View>
                        <Text style={styles.buttonText}>CREATE PERSON</Text>
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }
}