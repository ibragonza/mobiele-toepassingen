import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight, Component, AsyncStorage} from 'react-native';
const util = require("util");

export async function createExpense(senderID, targetId, tripId, value, currency, date, category, reason)
{
  var expenseId = Math.random(); // improve dealing with this
  var json = {"expense_id" : expenseId,"sender_id":senderID.trim(),"target_id":targetId.trim(),"trip_id":tripId,"currency":currency,"date":date,"category":category,"reason":reason,"amount" : value};
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



export async function CreateTripJSON(trip_id, destination, startDate, endDate, trip_currency)
{
    var trip_id = startDate.split("-").join("")  + "" + endDate.split("-").join("") + Math.random();
    var json = {"trip_id" : trip_id,"destination":destination,"start_date":startDate,"end_date":endDate, "trip_currency": trip_currency};
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
    var obj = await getTrips();
    delete obj[tripId];

    removeExpensesByTrip(tripId)

    try {
        await AsyncStorage.setItem('@Store:trips', JSON.stringify(obj));
        return obj;
    } catch (error) {
        console.log(error);
        return obj;
    }
}

export async function removeExpensesByTrip(tripId)
{
    var expenses = getExpensesForId(tripId)
    for(var i = 0; i < expenses.length; i++){
        removeExpenseById(expenses[i].expense_id)
    }
}

export async function removeExpenseById(expense_id)
{
    var obj = await getExpenses();
    delete obj[expense_id];
    try {
        await AsyncStorage.setItem('@Store:expenses', JSON.stringify(obj));
        return obj;
    } catch (error) {
        console.log(error);
        return obj;
    }
}

export async function deletePerson(person_id)
{
  var obj = await getPersons();
  delete obj[person_id];
  try {
    await AsyncStorage.setItem('@Store:persons', JSON.stringify(obj));
    return obj;
  } catch (error) {
    console.log(error);
    return obj;
  }

}

export async function createPerson(name, email)
{
	var person_id = name;
	var json = {"person_id" : person_id, "name":name, "email": email};
	try {
        const value = await AsyncStorage.getItem('@Store:persons');

        // implement extra check for if user already exists!;
        if (value !== null){
          var obj = JSON.parse(value);
          obj[person_id] = json;
          var JsonString = JSON.stringify(obj);
        }else{	
            var obj = {};
            obj[person_id] = json;
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
            await AsyncStorage.setItem('@Store:persons', JsonString);
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
      }else{
          return false;
      }
}
export async function getPersons()
{
	try {
        const value = await AsyncStorage.getItem('@Store:persons');
        if (value !== null){
          var obj = JSON.parse(value);
          return obj;
        }else{
            return [];
        }
      } catch (error) {
        console.log(error);
        return [];
      }
}

export async function getExpensesPerTrip(tripid){
  try{
    const na = await AsyncStorage.getItem('@Store:name');
    const value = await AsyncStorage.getItem('@Store:expenses');
    const arr = [];
    if (value !== null && na !==null){ // build in that user can do jackshit before a name is chosen
      const obj = JSON.parse(value);  
      for(key in obj){
        var cur = obj[key];
        console.log(cur);
        if(cur.sender_id == na && cur.trip_id == tripid){
          arr.push(cur);
        }
      }
    }else{
      const arr = [];
    }
    return arr;
  }catch(err){
    console.log(err);
    return [];
  }
}

export async function getExpenses(tripid){
  try{
    const na = await AsyncStorage.getItem('@Store:name');
    const value = await AsyncStorage.getItem('@Store:expenses');
    const arr = [];
    if (value !== null && na !==null){ // build in that user can do jackshit before a name is chosen
      const obj = JSON.parse(value);  
      for(key in obj){
        var cur = obj[key];
        console.log(cur);
        if(cur.sender_id == na){
          arr.push(cur);
        }
      }
    }else{
      const arr = [];
    }
    return arr;
  }catch(err){
    console.log(err);
    return [];
  }
}

export async function getLoans(){
  try{
    const na = await AsyncStorage.getItem('@Store:name');
    const value = await AsyncStorage.getItem('@Store:expenses');
    const arr = [];
    if (value !== null && na !==null){ // build in that user can do jackshit before a name is chosen
      console.log(JSON.stringify(value));
      const obj = JSON.parse(value); 
      for(key in obj){
        var cur = obj[key];
        console.log(cur);
        if(cur.target_id == na){
          arr.push(cur);
        }
      }
    }else{
      const arr = [];
    }
    return arr;
  }catch(error){
    console.log(error);
    return [];
  }
}

export async function getLoansPerTrip(tripid){
  try{
    const na = await AsyncStorage.getItem('@Store:name');
    const value = await AsyncStorage.getItem('@Store:expenses');
    const arr = [];
    if (value !== null && na !==null){ // build in that user can do jackshit before a name is chosen
      const obj = JSON.parse(value);  
      for(key in obj){
        var cur = obj[key];
        if(cur.target_id == na && cur.trip_id == tripid){
          arr.push(cur);
        }
      }
    }else{
      const arr = [];
    }
    return arr;
  }catch(error){
    console.log(error);
    return [];
  }
}



export async function CreateMoneyTransfer(username, targetId, date, currency, amount)
{
    var moneyTransferId = date + Math.random();
    var json = {"username" : username, "target_id": targetId, "date": date, "currency": currency, "amount": amount};
    try {
          const value = await AsyncStorage.getItem('@Store:transfers');
          if (value !== null){
            var obj = JSON.parse(value);
            obj[moneyTransferId] = json;
            var JsonString = JSON.stringify(obj);
          }else{
              var obj = {};
              obj[moneyTransferId] = json;
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
              await AsyncStorage.setItem('@Store:transfer', JsonString);
              return true;
            } catch (error) {
              console.log(error);
              return false;
            }
        }else{
            return false;
        }
}

export function getCategories()
{
	return ["FOOD","TRANSPORTATION","WHEREABOUTS","SOUVENIRS","SHOPPING","ACTIVITIES","EXTRA"];
}

export async function getUsersCurrency()
{
    try {
        const value = await AsyncStorage.getItem('@Store:currency');
        if (value !== null){
            return value;
        }else{
            return "EUR";
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
        return [];
      }
}
