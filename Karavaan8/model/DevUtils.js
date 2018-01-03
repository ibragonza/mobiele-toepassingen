import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight, Component, AsyncStorage} from 'react-native';
const util = require("util");
//Philip J Fry
export async function clearExpenses()
{
	try
	{
		await AsyncStorage.setItem('@Store:expenses',"{}");
	}
	catch (error)
	{
		console.log(error);
	}
}

export async function clearPersons()
{
	try
	{
		var result = {};
		await AsyncStorage.setItem('@Store:persons',"{}");
	}
	catch (error)
	{
		console.log(error);
	}
}

export async function clearTrips()
{
	try
	{
		await AsyncStorage.setItem('@Store:trips',"{}");
	}
	catch (error)
	{
		console.log(error);
	}
}
