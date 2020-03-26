import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Config from '../../constants/Config';
import ItemsNotas from './ItemsNotas';


class App extends Component {
  handleClick=(data)=>{
    let headerTitle =   alumno.materia + " " +alumno.grado_escolar + " " + alumno.seccion
    this.props.navigation.navigate('DetallesAsistencia');
    this.props.methods.updateState({headerMode:"screen",headerTitle:headerTitle,backgroundColor:Colors.screenWhose,asistencia_clase:data})
  }
  render() {
    let data      = this.props.data[1];
    let alumno    = data.alumno;
    let materias  = data.materias;
    return (  <View style={Styles.itemListFullWidth}>
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
                    </View>
                    <View style={Styles.col8}>
                        <View style={Styles.col}>
                          <Text style={Styles.nombreTitulo}>{alumno.nombres}</Text>
                        </View>
                        <View style={Styles.col}>
                          <Text style={Styles.nombreSubTitulo}>Grado {alumno.grado_escolar} Sección {alumno.letra}</Text>
                        </View>
                        <View style={Styles.row}>
                          <Text style={Styles.col2Center}>Nota</Text>
                          <Text style={Styles.col8}>Materia</Text>
                        </View>
                        {(materias!=undefined)?Object.entries(materias).map((v,k) => { return <ItemsNotas navigation={this.props.navigation} key={k} titulo={Colors.textWhose} data={v} handleClick={this.handleClick}/>}):<View/>}
                    </View>
                  </View>
                </View>
              </View>
            )
  }
}
export default App;
