import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight, Component, AsyncStorage} from 'react-native';
const util = require("util");

export var currencies = [];
export var currencyRates = {};

export async function getAllCurrencies(){
	try	
	{
		const currencyString = await AsyncStorage.getItem('@Store:currencies');
		var currencies = currencyString.split(",");
		if(currencies == [])
		{
			this.getCurrentCies();
			this.getAllCurrencies();
		}
		return currencies;
	}
	catch(error)
	{
		console.log(error);
	}
    return currencies;
}
export async function getCurrentCies()
{
	try
	{
		var currencies = [];
		var currencyRates = {};
		let response = await fetch('https://api.fixer.io/latest');
		let responseJSON = await response.json();
		responseJSON["rates"]["EUR"] = 1.00000;
		currencyRates = responseJSON["rates"];
		crstring = JSON.stringify(currencyRates);
		await AsyncStorage.setItem('@Store:currencyRates',crstring);
		for(var cName in currencyRates)
		{
			currencies.push(cName);
		}
		await AsyncStorage.setItem('@Store:currencies',currencies.toString());
		console.log("SUCCES");
	}
	catch(error)
	{
		console.log("THE ERROR " + error);
	}
}
export async function convert(amount,currency)
{
	if(currency != "EUR")
	{
		var currencyRates = JSON.parse(await AsyncStorage.getItem('@Store:currencyRates'));
		var rate = currencyRates[currency];
		amount = amount / rate * 1.00000;
	}
		return amount;
}