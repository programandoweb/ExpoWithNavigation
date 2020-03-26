import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';

class App extends Component {
  handleClick=(data)=>{
    let headerTitle =   data.materia + " " +data.grado_escolar + " " + data.seccion
    this.props.navigation.navigate('DetallesAsistencia');
    this.props.methods.updateState({headerMode:"screen",headerTitle:headerTitle,backgroundColor:Colors.screenWhose,asistencia_clase:data})
  }
  render() {
    let data = this.props.data;
    return (<TouchableOpacity style={Styles.itemList} onPress={()=>this.handleClick(this.props.data)}>
              <View style={Styles.card}>
                <View style={Styles.row}>
                  <View style={Styles.col2}>
                    <Avatar
                      size="medium"
                      rounded
                      icon={{name: 'user', type: 'font-awesome', }}
                      activeOpacity={0.7}
                      containerStyle={{backgroundColor: Colors.iconPrimary,}}
                    />
                  </View>
                  <View style={Styles.col8}>
                    <Text >{data.materia}</Text>
                    <Text style={Styles.SubTitulo}>{data.grado_escolar} {data.seccion}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>)
  }
}
export default App;
