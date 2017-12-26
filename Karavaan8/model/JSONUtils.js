import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight, Component, AsyncStorage} from 'react-native';
const util = require("util");

export async function createExpense(personId, targetId, tripId, value, currency, date, category, reason)
{
  var expenseId = Math.random(); // improve dealing with this
  var json = {"expense_id" : expenseId,"target_id":targetId,"trip_id":tripId,"currency":currency,"date":date,"category":category,"reason":reason};
  try {
      const value = await AsyncStorage.getItem('@Store:expenses');
      if (value !== null){
        var obj = JSON.parse(value);
        obj[expenseId] = json;
        var JsonString = JSON.stringify(obj);
      }else{	
          var obj = {};
          obj[expenseId] = json;
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
          await AsyncStorage.setItem('@Store:expenses', JsonString);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
    }else{
        return false;
    }
}



export async function CreateTripJSON(trip_id, destination, startDate, endDate)
{
    var trip_id = startDate.split("-").join("")  + "" + endDate.split("-").join("") + Math.random();
    var json = {"trip_id" : trip_id,"destination":destination,"start_date":startDate,"end_date":endDate};
    try {
        const value = await AsyncStorage.getItem('@Store:trips');
        if (value !== null){
          var obj = JSON.parse(value);
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

          return obj;
        }else{
            return [];
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
        return [];
      }
}
export async function getExpensesForId(tripId)
{
	try
	{
		const value = await AsyncStorage.getItem('@Store:expenses');
		if(value !== null)
		{
			var obj = JSON.parse(value);
			var result = [];
			for(var i = 0; i < obj.length;i++)
			{
				exp = JSON.parse(obj[i]);
				if(tripId == exp.trip_id)
				{
					result.append(exp);
				}
			}
			return result;
		}
		else
		{
			return [];
		}
	}
	catch(error)
	{
		console.log(error);
		return [];
	}
}
export async function removeTrip(tripId)
{
  console.log(tripId);
  var obj = await getTrips();
  delete obj[tripId];

  try {
    await AsyncStorage.setItem('@Store:trips', JSON.stringify(obj));
    return obj;
  } catch (error) {
    console.log(error);
    return obj;
  }
	
}

