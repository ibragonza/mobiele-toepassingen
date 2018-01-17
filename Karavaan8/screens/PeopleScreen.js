import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, ScrollView } from 'react-native';
import { getPersons, deletePerson, createList } from '../model/JSONUtils'
import styles from './styles.js'

const util = require("util");

export default class PeopleScreen extends React.Component {
  constructor(props)
	{
		super(props);
		this.state = { people : [], loaded : ""};
		this.fetchPersons = this.fetchPersons.bind(this);
	    this.deletePerson = this.deletePerson.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
  }
  
    refresh() {
		this.fetchPersons();
	}

	componentDidMount() {
		this.fetchPersons().done();
	}
    async fetchPersons()
    {
        try
        {
            var setPerson = await getPersons(this.state.name);
            if(!setPerson)
            {
                Alert.alert("Oops, something went wrong :(");
            }
            else
            {
                const people = await getPersons();
                var list = await createList(people, "person")
                this.setState({people : list});
                this.setState({loaded : "True"});
            }
	    }
        catch(error)
        {
            alert(error);
        }
    }

    async deletePerson(person_id)
    {
        const people = await deletePerson(person_id);
        var list = await createList(people, "person")
        this.setState({people : list});
		
  	}

    confirmDelete(person_id)
    {
        Alert.alert('Delete Person?','Are you sure you want to delete this Person?',
        [{text: 'Delete', onPress: () => this.deletePerson(person_id)},
        {text: 'I Changed my Mind', onPress: () => console.log('OK Pressed')},],
        { cancelable: false })
    }

  render() {
    var {navigate} = this.props.navigation;
	if(this.state.loaded == "")
	{
		return false;
	}
	else
	{
	    var people = [];
	    var people = this.state.people.map((entry,index) => (
           <View style={styles.buttonContainer}>
           		<View style={styles.buttonViewPeople}>
                    <TouchableHighlight onPress={() => navigate("PeopleExpenses",{person:entry.name})}>
                        <View>
                            <Text style={styles.buttonViewText}>{entry.name}</Text>
                            <Text style={styles.buttonViewText}>{entry.email}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight style={styles.exitcolumn} onPress={() => this.confirmDelete(entry.person_id)}>
                        <Text style={styles.exitText}>X</Text>
                    </TouchableHighlight>
                </View>
            </View>
        ));

        return (
          <Image source={require('../images/people-background.png')} style={styles.container}>
            <ScrollView style={styles.navbar}>
            <Text style={styles.header}>People</Text>
            <TouchableHighlight style={styles.addButton} onPress={() => navigate("AddPerson", {onGoBack: () => this.refresh()})}>
            <View>
              <Text style={styles.buttonText}>ADD PERSON</Text>
            </View>
          </TouchableHighlight>
           {people}
        </ScrollView>
        </Image>
        );
    }
  }
}