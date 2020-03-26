import React, { Component } from 'react';
import { View, Text, ScrollView,TouchableOpacity  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';

class App extends Component {
  render() {
    return (<TouchableOpacity style={Styles.itemList} onPress={()=>this.props.method()}>
              <View style={Styles.card}>
                <View style={Styles.header}>
                  <Avatar
                    size="medium"
                    rounded
                    title={this.props.icon}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={Styles.Body}>
                  <Text style={Styles.Titulo}>{this.props.title}</Text>
                </View>
              </View>
            </TouchableOpacity>)
  }
}
export default App;
