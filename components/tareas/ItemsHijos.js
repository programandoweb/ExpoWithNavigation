import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import {Functions} from '../../helpers/';
import Config from '../../constants/Config';
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {

    }
  }

  handleClick=()=>{
    this.props.navigation.navigate('TareasDeMiHijo')
    this.props.methods.updateState({  headerTitle:Functions.CutString(this.props.data[1].nombres,3),
                                      backgroundColor:Colors.screenPrimary,
                                      method_goBack:this.props.navigation.goBack,
                                      grado_escolar_token:this.props.data[1].grado_escolar_token,
                                      Functions:Functions.getInfo,
                                  });
  }

  render() {
    let data    =   this.props.data[1];
    return (<TouchableOpacity style={Styles.itemList} onPress={()=>{this.handleClick()}} >
              <View style={Styles.card}>
                <View style={Styles.header}>
                  <Avatar
                    overlayContainerStyle={{backgroundColor: Colors.iconWhose}}
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    activeOpacity={0.7}
                    source={{uri: Config.images+data.avatar}}
                  />
                </View>
                <View style={Styles.Body}>
                    <Text style={Styles.Titulo}>{data.nombres}</Text>
                    <Text style={Styles.SubTitulo}>Grado {data.grado_escolar} Sección {data.letra}</Text>
                </View>                
              </View>
            </TouchableOpacity>)
  }
}
export default App;
