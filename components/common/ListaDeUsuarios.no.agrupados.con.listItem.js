import React, { Component } from 'react';
import { View,  Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Card,ListItem } from 'react-native-elements';
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
                          <ListItem
                            roundAvatar
                            leftAvatar={{ source: { uri: Config.images+data.avatar } }}
                            chevron
                            title={<View>
                                          <Text style={this.props.styles.title}>{data.alumno}</Text>
                                          <Text style={this.props.styles.email}>{data.telefono} {data.email}</Text>
                                  </View>}
                            bottomDivider
                        /></TouchableOpacity>
                      )
                    }):<View></View>
                  }
                </ScrollView>
              </KeyboardAvoidingView>
    );
  }
}
export default ListaDeUsuarios;
