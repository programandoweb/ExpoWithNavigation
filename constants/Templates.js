import React, { Component } from 'react';
import { View, Text  } from 'react-native';
import Styles from './Styles';
import Colors from './Colors';
import { Avatar } from 'react-native-elements';
class ItemVacio extends Component {
  constructor (args) {
    super(args)
    this.state = {
      message:"No hay registros para mostrar",
    }
  }


  item  = ()  =>{
    return <View style={Styles.itemListFullWidth}>
      <View style={Styles.card}>
        <Avatar
          size="medium"
          rounded
          icon={{name: 'frown-o', type: 'font-awesome', }}
          activeOpacity={0.7}
          containerStyle={{backgroundColor: Colors.iconPrimary,}}
        />
        <View>
          <Text style={Styles.SubTitulo}>{(this.props.message==undefined)?this.state.message:this.props.message}</Text>
        </View>
      </View>
    </View>
  }

  render() {
    return (this.item())
  }
  
}

class NoInternet extends Component {
  render() {
    return (<View style={Styles.itemListFullWidth}>
              <View style={Styles.card}>
                <Avatar
                  size="medium"
                  rounded
                  icon={{name: 'frown-o', type: 'font-awesome', }}
                  activeOpacity={0.7}
                  containerStyle={{backgroundColor: Colors.iconPrimary,}}
                />
                <View>
                  <Text style={Styles.SubTitulo}>No hay conexión a Internet</Text>
                </View>
              </View>
            </View>)
  }
}

export default (NoInternet,ItemVacio)
