import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Config from '../../constants/Config';

class App extends Component {
  handleClick=(data)=>{

  }
  render() {
    return (<TouchableOpacity  onPress={()=>{this.handleClick()}} >
              <View style={Styles.row}>
                <Text style={Styles.col2Center}>1</Text>
                <Text style={Styles.col8}>{this.props.data[1]}</Text>
              </View>
            </TouchableOpacity>
            )
  }
}
export default App;
