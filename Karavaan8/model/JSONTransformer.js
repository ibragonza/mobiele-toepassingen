import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight, Component} from 'react-native';
const util = require("util");

export function CreateParticipantJSON(trip_id, firstName,lastName)
{
	var result = JSON.parse(`{"trip_id":${trip_id},"firstName":"${firstName}","lastName":"${lastName}"}`);
	return result
}
export function CreatePaymentJSON(trip_id,payer,receiver,date,currency)
{
	//var result = JSON.parse(`{"trip_id":${trip_id},"
}
