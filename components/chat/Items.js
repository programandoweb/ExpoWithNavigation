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
    return (  <View style={(this.props.yo.usuario_id==data.usuario_id)?Styles.cardCommentYo:Styles.cardComment}>
                <View style={{flexDirection: 'row',flexWrap:'wrap',}}>
                  <View style={{flex: 1,}}>
                    <Text style={(this.props.yo.usuario_id==data.usuario_id)?Styles.h5Right:Styles.h5}>{(this.props.yo.usuario_id==data.usuario_id)?"Yo":data.nombres}</Text>
                  </View>
                </View>
                <View style={Styles.contenedorMensaje}>
                  <View style={Styles.col}>
                    <Text style={Styles.comentarioMensaje}>{data.mensaje}</Text>
                  </View>
                  <Text style={Styles.fechaMensaje}>{data.fecha}</Text>
                </View>
              </View> )
  }
}
export default App;
