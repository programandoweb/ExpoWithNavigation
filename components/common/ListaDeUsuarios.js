import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Card,ListItem,Avatar } from 'react-native-elements';
import Topbar from './Topbar';
import {Config} from '../../helpers/Config';
import SearchFilter from './SearchFilter';

class ListaDeUsuarios extends Component {

  render() {
    //console.log(this.props.state.ListaDeMisAlumnos);
    return (  <KeyboardAvoidingView style={ this.props.styles.keyboard} behavior="padding" enabled>
                <ScrollView style={ this.props.styles.container}>
                  <Topbar name="Lista de Alumnos" back="Home" methods={this.props.methods} props={this.props}/>
                  <SearchFilter name="Lista de Alumnos" back="Home" methods={this.props.methods} props={this.props}/>
                  {
                    (this.props.state.ListaDeMisAlumnos!=undefined && Object.keys(this.props.state.ListaDeMisAlumnos).length)?Object.entries(this.props.state.ListaDeMisAlumnos).map((v,k) => {
                      let data
                      if (v[1]!=undefined) {
                        data  =   v[1];
                      }
                      //console.log(data);
                      return (
                        <TouchableOpacity
                                    key={k}
                                    onPress={()=>this.props.handleChageScreenNoAjax(data,"ver_Alumno",this.props.back)}>

                          <View key={k} style={{flexDirection: 'row',padding: 10,}}>
                            <View style={{flex: 0.1, padding: 10,}}>
                              <Avatar
                                rounded
                                icon={{name: 'user', type: 'font-awesome'}}
                                source={{uri: Config.images+data.avatar}}
                                activeOpacity={0.7}
                              />
                            </View>
                            <View style={{flex: 0.9, paddingTop: 10, paddingBottom: 10,borderBottomColor: "#f2f2f2",borderBottomWidth: 1}}>
                              <Text style={this.props.styles.title}>{data.alumno} </Text>
                              <Text style={this.props.styles.title}>{data.grado} {data.seccion}</Text>
                            </View>
                          </View>

                        </TouchableOpacity>
                      )
                    }):<View></View>
                  }
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default ListaDeUsuarios;
