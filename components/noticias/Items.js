import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';

class App extends Component {
  handleClick=(key,value)=>{
    this.props.navigation.navigate('Detalles',{data:{"key":key,"value":value}})
    this.props.methods.updateState({headerMode:"screen",headerTitle:value,backgroundColor:Colors.screenSecondary})
  }
  render() {
    let key = (this.props.data[0]!=undefined)?this.props.data[0]:[]
    let value = (this.props.data[0]!=undefined)?this.props.data[1]:[]
    return (<TouchableOpacity style={Styles.itemList} onPress={()=>this.handleClick(key,value)}>
              <View style={Styles.card}>
                <View style={Styles.header}>
                  <Avatar
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={Styles.Body}>
                  <Text style={Styles.Titulo}>{this.props.data[1]}</Text>
                  <Text style={Styles.SubTitulo}>Grado</Text>
                </View>
              </View>
            </TouchableOpacity>)
  }
}
export default App;
