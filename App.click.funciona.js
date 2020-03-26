import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from "react-native";
import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

class Sound extends Component {
  constructor (args) {
    super(args)
    this.state = {
      Click:"",
      playClick:"",
    }
  }

  componentDidMount() {
    this._Sound();
  }

  componentWillUnmount(){

  }

  _Sound  =   async ()  =>{
    try {
      click     = await soundObject.loadAsync(require('./audio/Click3.mp3'));
    } catch (error) {
      console.log("error: "+error);
    }
  }

  play = async () => {
      console.log("Playing Messages!")
      const status = await soundObject.playAsync();
      const Restatus = await soundObject.replayAsync();
  }
  stop = () => {
        console.log("Messages stopped!")
        soundObject.pauseAsync();
  }

  render(){
    return( <View style={{flex: 1, padding: 100}}>
                <View style={{jusifyContent: "center", alignItems: "center"}}>
                  <Button
                      title="Press me"
                      onPress={() => this.play()}
                    />
                </View>
            </View>)
  }
}

export default Sound
