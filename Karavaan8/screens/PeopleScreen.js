import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableHighlight,Image} from 'react-native';

const util = require("util");

export default class PeopleScreen extends React.Component {
  constructor(props)
	{
		super(props);
		this.state = { People : []};
	}
  refresh() {
    // refresh data
  }
  render() {
    var {navigate} = this.props.navigation;
    return (
      <Image source={require('../images/people-background.png')} style={styles.container}>
	<View style={styles.navbar}>
		<Text>People</Text>
    </View>
    <View style={styles.navbar}>
          <TouchableHighlight style={styles.addExpensebutton} onPress={() => navigate("AddPerson", {onGoBack: () => this.refresh()})}> 
            <View>
              <Text style={styles.buttonText}>ADD PERSON</Text>
            </View>
          </TouchableHighlight>
        </View>

    </Image>
    );
  }
}

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