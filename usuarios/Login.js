import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Card, Input, Button  } from 'react-native-elements';
import {Storage} from './../helpers/';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Config} from '../constants';
import {Colors,Sizes,Styles} from '../constants/';

const _Storage  = Storage.St;

class Cards extends Component {

  constructor (args) {
    super(args)
    this.state = {
      login: "erick",
      password: "123456",
    }
  }

  setUsuario    = (data)=>{
    _Storage.set("user",data.store,this.props.methods);
    this.props.methods.cheq_session();
  }

  handlerButton =   (event)=>{
    this.props.methods.sobre_escribir_el_estado({loading:true});
    var headers =   new Headers();
    var data    =   new FormData();
        data.append ("login", this.state.login);
        data.append ("password", this.state.password);
    let cabecera  =   { headers:headers,
                        method: "POST",
                        body: data
                      }
    fetch(Config.ApiRest + "post?modulo=Usuarios&m=login&formato=json",cabecera)
      .then(response => response.json())
      .then(data =>
        this.setUsuario(data.response)
      );
  }

  Login = () =>{
    return <View style={{ flex: 1,}}>
              <View style={{backgroundColor: Colors.screenFifth, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
                <View style={{ alignItems: 'center' ,}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    icon={{color: Colors.iconFifth, name: 'user', type: 'font-awesome'}}
                    overlayContainerStyle={{backgroundColor: Colors.iconBgFifth, borderWidth: 10, borderColor: Colors.screenFifth,}}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{  color:Colors.textFifth , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20, flex: 0.8}}>
                    Identificación
                  </Text>
                </View>
              </View>
              <View >
                <View>
                  <Input
                    onChangeText={(text)=>{this.setState({login:text});}}
                    placeholder='Nombre de Usuario'
                    rightIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                    errorStyle={{ color: 'red' }}
                    value={this.state.login}
                  />
                </View>
                <View>
                  <Input
                    secureTextEntry={true}
                    onChangeText={(text)=>{this.setState({password:text});}}
                    placeholder="Password"
                    rightIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                    errorStyle={{ color: 'red' }}
                    value={this.state.password}
                  />
                </View>
              </View>
              <View style={{alignContent: 'center', alignSelf: 'center',}}>
                <Button buttonStyle={{backgroundColor: "#222", marginTop: 120, width: "100%"}} title="Ingresar al Sistema"  onPress={this.handlerButton}/>
              </View>
            </View>
  }

  render() {
    return (
      this.Login()
    )
  }

}
export default Cards;
