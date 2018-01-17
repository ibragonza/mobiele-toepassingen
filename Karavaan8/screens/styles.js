import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
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
        marginTop: 40
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
    },
  	chosenText :
  	{
  		fontSize: 20,
  		color : 'red',
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
    },
    Modal:
    {
    	width: 200,
    	height: 40,
    	backgroundColor: "white"
    },
    dropdown :
    {
    	backgroundColor: "#d3d3d3",
    	marginLeft:'auto',
    	marginRight:'auto',
    	width: 300,
    	borderWidth: 2,
    	borderColor: '#A2A794'
    },
    dropdownTextStyle:
    {
        color:'red',
    	backgroundColor:'#b3b3b3'
    },
    dropdownText:
    {
    	color : 'red',
    	fontSize: 24,
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
        color: 'white',
        marginTop: 20,
        alignSelf: 'center',
    },
    expenseText:
    {
        textAlign: 'left',
        alignSelf: 'stretch',
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
        width: 120,
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
        fontSize: 21,
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
        fontSize: 19,
        width: 105,
    },
    tableView:
    {
        alignSelf: 'center',
        marginTop: 20,
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
    }
});


module.exports = styles;