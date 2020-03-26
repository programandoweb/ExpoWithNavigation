import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from "react-native";
import Sounds from './constants/Sounds';
import SoundProvider from './contextSound';


class Sound extends Component {
  constructor (args) {
    super(args)
    this.state = {
      Click:"",
      playClick:"",
    }
  }

  componentDidMount() {
    Sounds.init()
  }

  componentWillUnmount(){
    Sounds.init()
  }

  play=()=>{
    Sounds.play()
  }

  render(){
    return(  <SoundProvider.Provider value={Sounds}><View style={{flex: 1, padding: 100}}>
                <View style={{jusifyContent: "center", alignItems: "center"}}>
                  <Button
                      title="Press me"
                      onPress={() => this.play()}
                    />
                </View>
              </View>
            </SoundProvider.Provider>)
  }
}

export default Sound
