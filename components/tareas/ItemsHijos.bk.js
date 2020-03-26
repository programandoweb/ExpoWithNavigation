import React, { Component } from 'react';
import { View, Text, ScrollView , TouchableOpacity, Button , TextInput } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar, Input, Badge } from 'react-native-elements';
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
    this.props.methods.updateState({  headerTitle:Functions.CutString(this.state.alumno.nombres,3),
                                      backgroundColor:Colors.screenPrimary,
                                      method_goBack:this.props.navigation.goBack,
                                      evaluaciones:this.state.tareas,
                                  });
  }

  render() {
    let data    =   this.props.data;

    return (<TouchableOpacity style={Styles.itemListFullWidth} onPress={()=>{this.handleClick()}} >
              <View style={Styles.card}>
                <View style={Styles.row}>
                  <View style={Styles.col2}>
                    <Avatar
                      overlayContainerStyle={{backgroundColor: Colors.iconWhose}}
                      size="medium"
                      rounded
                      icon={{name: 'user', type: 'font-awesome'}}
                      activeOpacity={0.7}
                      source={{uri: Config.images+alumno.avatar}}
                    />
                  <Badge status="error" value={tareas.length} containerStyle={{ position: 'absolute', top: -4, right: 12 }}/>
                  </View>
                  <View style={Styles.col8}>
                      <View style={Styles.col}>
                        <Text style={Styles.nombreTitulo}>{alumno.nombres}</Text>
                      </View>
                      <View style={Styles.col}>
                        <Text style={Styles.nombreSubTitulo}>Grado {alumno.grado_escolar} Sección {alumno.letra}</Text>
                      </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>)
  }
}
export default App;
