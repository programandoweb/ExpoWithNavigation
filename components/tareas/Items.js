import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';


class App extends Component {

  handleClick=(key,value)=>{
    /*click sound*/
    //this.props.extraData.play();
    let data  = this.props.extraData.ListaDeEvaluaciones;
    this.props.navigation.navigate('DetallesTareas',{data:{"key":key,"value":value}})
    this.props.methods.updateState({headerMode:"screen",headerTitle:value,backgroundColor:Colors.screenPrimary,list:data[key],})
  }

  render() {
    let key = (this.props.data[0]!=undefined)?this.props.data[0]:[]
    let value = (this.props.data[0]!=undefined)?this.props.data[1]:[]
    return (<TouchableOpacity style={Styles.itemList} onPress={()=>this.handleClick(key,value)}>
              <View style={Styles.card}>
                <View style={Styles.header}>
                  <Avatar
                    overlayContainerStyle={{backgroundColor: Colors.screenPrimary}}
                    size="medium"
                    rounded
                    icon={{name: 'book', type: 'font-awesome'}}
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
