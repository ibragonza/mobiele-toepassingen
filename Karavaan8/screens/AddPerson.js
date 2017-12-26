import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import {  } from '../model/JSONUtils'


const util = require("util");

export default class AddPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.fetchPersons = this.fetchPersons.bind(this);
    }

    componentDidMount() {
        this.fetchPersons().done();
    }

    async fetchPersons() {
		
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
                    />
                </View>
                <TouchableHighlight style={styles.addExpensebutton} >
                    <View>
                        <Text style={styles.buttonText}>CREATE PERSON</Text>
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    header: {
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
