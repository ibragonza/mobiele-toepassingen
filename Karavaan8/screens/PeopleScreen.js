import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, ScrollView } from 'react-native';
import { getPersons, deletePerson } from '../model/JSONUtils'
import email from 'react-native-email'
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
            const person = [];
            for(var key in people){
                person.push({
                    name : people[key].name,
                    person_id : people[key].person_id,
                    email : people[key].email
                })
            }
            this.setState({people : person});
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
		
  		const persons = await deletePerson(person_id);
  		const personsss = [];
  		for(var key in persons){
  			personsss.push({
  				person_id : persons[key].person_id,
  				name : persons[key].name,
  				email : persons[key].email
  			})
  		}
  		this.setState({people : personsss});
		
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
           		<View style={styles.buttonView}>
                    <TouchableHighlight onPress={() => this.sendEmail(entry.email)}>
                        <View>
                            <Text style={styles.buttonText}>{entry.name}</Text>
                            <Text style={styles.buttonText}>{entry.email}</Text>
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
            <TouchableHighlight style={styles.addButton} onPress={() => navigate("AddPerson")}>
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

    async sendEmail(sendTo) {
        email(sendTo, {
        subject: 'Email from Karavaan',
                 body: 'Some body right here'
        }).catch(console.error)
    }
}
/*
const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    fontWeight: 'bold'
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
  title : 
  {
	 fontSize : 32,
	 textAlign : 'center',
	 color : '#00FF7F',
  },
  buttonContainer: {
    flexDirection: 'row',
  	backgroundColor: 'white',
  	borderRadius: 6,
  	marginTop:20,
  	justifyContent: 'center',
  	alignItems: 'center'
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
        fontSize: 21,
        textAlign: 'left',
        marginLeft: 10
    },
     exitcolumn :
     {
    	//backgroundColor : 'red',
    	backgroundColor: '#FF4136',
    	width : 40,
    	flex: 1,
    	//height: 55,
    	alignSelf:'center',
    	justifyContent:'center',
    	//borderRadius: 8,
    	//borderWidth: 2,
    	borderColor: '#A2A794',

     },
     exitText :
     {
    	color: 'white',
    	alignSelf:'center',
    	justifyContent:'center',
    	fontSize:30,
      },
  buttonView:
   {
    width: 160,
   },
});*/