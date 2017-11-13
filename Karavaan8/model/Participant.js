import React from 'react';
import { StyleSheet, Text, View,Button,Alert,TouchableHighlight} from 'react-native';
const util = require("util");

export default class Participant
{
    name: string;
    constructor(name)
    {
    this.name = name;
    }
}