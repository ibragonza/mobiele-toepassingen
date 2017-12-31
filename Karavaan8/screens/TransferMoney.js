import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, Dropdown, TextInput } from 'react-native';
import OurPicker from '../view/OurPicker.js';
import DatePicker from 'react-native-datepicker'
import { CreateMoneyTransfer, getPersons, getAllCurrencies } from '../model/JSONUtils'
import ModalDropdown from 'react-native-modal-dropdown';



const util = require("util");

export default class TransferMoney extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { username: '',
                        targetId: '',
                        targetUsername: '',
                        date: "",
                        currency: "",
                        amount: "",
                        people: [],
                        allCurrencies: []};
        this.send = this.send.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData().done();
    }

    async fetchData()
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
                this.setState({people : setPerson});
                this.setState({loaded : "True"});
            }
        }

        catch(error)
        {
            alert(error);
        }

        var setCurrency = await getAllCurrencies();
        this.setState({allCurrencies : setCurrency });
        this.setState({currency : this.state.allCurrencies[0]})
    }

    refresh()
    {
        // refresh data
    }

    async send()
    {
        var {navigate} = this.props.navigation;
        if(this.state.username == "")
        {
             Alert.alert("Please enter your username");
        }
        if(this.state.targetUsername == "")
        {
             Alert.alert("Please choose target username");
        }
        if(this.state.date == "")
        {
             Alert.alert("Please choose date"); //Misschien beter om automatisch datum op te halen?
        }
        if(this.state.currency == "")
        {
             Alert.alert("Please choose currency you paid in");
        }
        if(this.state.amount == "")
        {
             Alert.alert("Please enter amount");
        }
        else
        {
            var result =
            {
                username: this.state.username,
                targetId: this.state.targetUsername.person_id,
                date: this.state.date,
                currency: this.state.currency,
                amount: this.state.amount
            };
            var setResult = await CreateMoneyTransfer(result.username, result.targetId, result.date, result.currency, result.amount);
            if(!setResult){
                Alert.alert("Oops, something went wrong :(");
            }else{
		        this.props.navigation.navigate("First"); //zal later naar de summary gaan
            }
        }
    }

    render() {
        var {navigate} = this.props.navigation;
        return (
            <Image source={require('../images/expense-background.png')} style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.header}>Register Money Transfer</Text>

                    <Text style={styles.entryText}>Your username</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
                        keyboardType = 'default'
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />

                    <Text style={styles.entryText}>Target username</Text>
                    <ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.dropdownText}
                        options={this.state.people}
                        renderRow={this._targetUsername_renderRow.bind(this)}
                        renderSeparator={(rowID) => this._targetUsername_renderSeparator(rowID)}
                        onSelect ={(idx,value) => this.setState({targetUsername : value}) }
                        value={this.state.targetUsername.name}
                    >
                    <Text style={styles.entryText}>Tap to choose: {this.state.targetUsername.name}</Text>
                    </ModalDropdown>

                    <TouchableHighlight style={styles.addPersonButton} onPress={() => navigate("AddPerson")}>
                        <View>
                          <Text style={styles.addPersonButtonText}>ADD PERSON</Text>
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.entryText}>Amount</Text>
                    <TextInput
                        style={styles.textInput}
                        editable = {true}
						keyboardType = 'numeric'
                        onChangeText={(amount) => this.setState({amount})}
                        value={this.state.amount}
                    />

                    <ModalDropdown style={styles.Modal}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.dropdownText}
                        defaultValue={"EUR"}
                        options={this.state.allCurrencies}
                        onSelect ={(idx,value) => this.setState({currency : value}) }
                        value={this.state.currency}
                    />

                    <Text style={styles.entryText}>Date</Text>
                    <DatePicker
                        style={styles.date}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={
                            (date) =>
                            {
                                this.setState({
                                    date: date
                                })
                            }
                        }
                        customStyles={{ dateText: { color: 'black', }, placeholderText: { color: 'black', }, }} />
                </View>
                <TouchableHighlight style={styles.transferMoneyButton} onPress={this.send}>
                    <View>
                        <Text style={styles.buttonText}>TRANSFER MONEY</Text>
                    </View>
                </TouchableHighlight>
            </Image>
        );
    }


    _targetUsername_renderRow(rowData){
        return (
              <TouchableHighlight>
                <View>
                  <Text>
                    {`${rowData.name}`}
                  </Text>
                </View>
              </TouchableHighlight>
            );
    }

    _targetUsername_renderSeparator(rowID){
        let key = `spr_${rowID}`;
        return (<View key={key.name} />);
    }
}

const styles = StyleSheet.create({
    header:
    {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    entryText:
    {
        fontSize: 24
    },
    navbar:
    {
        flex: 1,
        marginTop: 40,
    },
    navbarText:
    {
        fontSize: 20,
    },
    container:
    {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transferMoneyButton:
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
    },
    addPersonButton:
    {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 3,
        width: 100,
        height: 30,
        marginLeft: 5,
        marginRight: 'auto',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPersonButtonText:
    {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
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
      }
});
