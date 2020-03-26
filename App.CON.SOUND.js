import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

class Sound extends Component {

  componentDidMount() {
    this._Sound();
  }

  componentWillUnmount(){

  }

  _Sound= async ()  =>{
    try {
      await soundObject.loadAsync(require('./audio/Click.mp3'));
      await soundObject.playAsync();
      console.log("YES");
    } catch (error) {
      console.log("error: "+error);
    }
  }

  render(){
    return(<View><Text>Hola</Text><Text>Hola</Text><Text>Hola</Text><Text>Hola</Text><Text>Hola</Text></View>)
  }
}

export default Sound
