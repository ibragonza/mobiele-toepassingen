import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight, Component, AsyncStorage} from 'react-native';
const util = require("util");

export function createExpenseJSON(expenseId, personId, targetId, tripId, value, numberOfTargets, currency, date, category, reason)
{
    return JSON.parse(`{"expense_id": expenseId,
                        "person_id": personId,
                        "target_id": targetId,
                        "trip_id": tripId,
                        "value": value,
                        "number_of_targets": numberOfTargets,
                        "currency": currency,
                        "date": date,
                        "category": category,
                        "reason": reason}`)
}

export function createPersonJSON(personId, firstName, lastName)
{
    return JSON.parse(`{"person_id": personId,
                        "first_name": firstName,
                        "last_name": lastName}`)
}

export async function CreateTripJSON(trip_id, destination, startDate, endDate)
{
    var trip_id = startDate.split("-").join("")  + "" + endDate.split("-").join("");
    var json = {"trip_id" : trip_id,"destination":destination,"start_date":startDate,"end_date":endDate};
    try {
        const value = await AsyncStorage.getItem('@Store:trips');
        if (value !== null){
          var obj = JSON.parse(value);
          console.log("was stored:",obj);
          obj[trip_id] = json;
          var JsonString = JSON.stringify(obj);
        }else{
            var obj = {};
            obj[trip_id] = json;
            var JsonString = JSON.stringify(obj);
        }
        var set = true;
      } catch (error) {
        // Error retrieving data
        console.log(error);
        var set = false;
        return false;
      }

      if(set === true){
        try {
            await AsyncStorage.setItem('@Store:trips', JsonString);
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
      }else{
          return false;
      }
}

export async function getTrips(){
    try {
        const value = await AsyncStorage.getItem('@Store:trips');
        if (value !== null){
          var obj = JSON.parse(value);
          console.log("Got value:", obj);
          return obj;
        }else{
            console.log("No value");
            return [];
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
        return [];
      }
}

export function CreateDebtJSON(donorId, receiverId, tripId, value, currency)
{
	return JSON.parse(`{"donor_id": donorId,
	                "receiver_id": receiverId,
	                "trip_id": tripId,
	                "value": value,
	                "currency": currency`);
}
