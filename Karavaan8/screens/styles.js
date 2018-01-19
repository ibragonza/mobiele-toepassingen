import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	addTripEntryText:
	{
		fontSize: 24,
		marginTop: 20,
		color:'white',
		alignSelf: 'center',
		fontWeight: 'bold'
	},
    buttonImage:
    {
        flexDirection: 'row'
    },
    navbarF:
    {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbar:
    {
        flex: 1,
        marginTop: 40,
        alignSelf: 'center'
    },
	addButtonText:
	{
		fontSize: 24,
		color : 'white',
	},
    header:
    {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    entryText:
    {
        fontSize: 24,
  		marginTop : 20,
  		alignSelf: 'center'
    },
  	chosenText :
  	{
        backgroundColor: "white",
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        width: 350,
        marginTop: 5
  	},
    button:
    {
        backgroundColor: "#D5DCC1",
        margin: 20,
        width: 300,
        height: 100,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A2A794',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonTextF: {
        fontSize: 48,
        marginLeft: 10,
        color:'#656A58'
    },
    article:
    {
        flex: 10,
    },
    icon: {
        height: 40,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton:
    {
        borderRadius: 3,
        width: 200,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
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
    buttonViewText:
    {
        fontSize: 20,
        textAlign: 'center',
        opacity: 1
    },
    buttonViewTextExpense:
    {
        fontSize: 20,
        textAlign: 'left',
        opacity: 1
    },
    Modal:
    {
    	width: 350,
    	backgroundColor: "white",
        borderWidth: 2,
        borderColor: '#A2A794'
    },
    dropdown:
    {
    	backgroundColor: "white",
    	marginLeft:'auto',
    	marginRight:'auto',
    	width: 350,
    	borderWidth: 2,
        borderColor: '#A2A794'
    },
    dropdownTextStyle:
    {
    	textAlign: 'center',
    	fontSize: 20
    },
    textInput:
    {
    	backgroundColor: 'white',
        height : 40,
        borderWidth:1,
        borderColor: 'grey',
        fontSize: 18,
        textAlign:'center',
    },
    navbarText:
    {
        fontSize: 20,
    },
    addTripContainer:
    {
        marginTop: -200,
    },
    date:
    {
        width: 200,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'white',
    },
    text:
    {
        color : 'white',
        fontSize: 20,
    },
    dateText:
    {
        fontSize: 20,
        color: 'black',
        marginTop: 20,
        alignSelf: 'center',
    },
    expenseText:
    {
        textAlign: 'left',
        alignSelf: 'center',
        color: '#2784A3',
        fontSize: 30,
        marginTop: 20,

    },
    head:
    {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        backgroundColor: 'white',
    },
    headthirdText:
    {
        width: 80,
        marginLeft: 2,
        fontSize: 21,
    },
    headFirstText:
    {
        width: 110,
        marginLeft: 2,
        fontSize: 21,
    },
    headSecText:
    {
        width: 100,
        fontSize: 21,
        textAlign: 'center',
    },
    headEditText:
    {
        marginLeft: 2,
        fontSize: 21,
        width: 60,
    },
    headText:
    {
        marginLeft: 5,
        fontSize: 18,
		width: 133,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    headTextTransactionOverview:
    {
        marginLeft: 5,
        fontSize: 18,
        width: 100,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    rows:
    {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    rowText:
    {
        marginLeft: 5,
        fontSize: 18,
        width: 133,
        textAlign: 'center'
    },
    rowTextTransactionOverview:
    {
        marginLeft: 5,
        fontSize: 18,
        width: 100,
        textAlign: 'center'
    },
    tableView:
    {
        alignSelf: 'center',
        marginTop: 20,
        width: 400
    },
    edit:
    {
        flexDirection: 'row',
        backgroundColor : 'black',
    },
    editText:
    {
        textAlign: 'center',
        fontSize: 19,
        width: 50,
        color: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
      	backgroundColor: 'white',
      	borderRadius: 6,
      	marginTop:20,
      	justifyContent: 'center',
      	alignItems: 'center'
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
    buttonViewPeople:
    {
        width: 300,
    },
    expensesContainer:
    {
        opacity: 0.8,
        width: 350
    },
    expensesDetailsText:
    {
        color: 'black',
        fontSize: 24
    },
    buttonViewExpense:
    {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});


module.exports = styles;