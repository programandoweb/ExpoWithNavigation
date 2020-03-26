import React, { Component } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Items from './Items';
import {Storage} from '../../helpers/';

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
      login: "erick",
      password: "123456",
    }
  }
  singout=()=>{
    Storage.St.clear(this.props.methods);
  }

  handleClick=()=>{
    this.props.navigation.navigate('MisDatosPersonales');
    //this.props.methods.updateState({headerMode:"screen",headerTitle:"Ms Datos Personales",backgroundColor:Colors.screenFifth})
  }

  render() {
    return (<View style={{ flex: 1,}}>
              <View style={{backgroundColor: Colors.screenFifth, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
                <View style={{ alignItems: 'center' ,}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    icon={{color: Colors.iconBgFifth, name: 'user', type: 'font-awesome'}}
                    overlayContainerStyle={{backgroundColor: Colors.iconFifth, borderWidth: 10, borderColor: Colors.iconBgFifth}}
                    activeOpacity={0.7}
                  />
                </View>
                <Text style={{  color:Colors.textFifth , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20,}}>Mi Cuenta</Text>
              </View>
              <ScrollView style={Styles.body}>
                <View style={Styles.row}>
                  <Items icon="MD" title="Mis datos" method={this.handleClick}/>
                  <Items icon="CS" title="Cerrar sesión" method={this.singout} />
                  {(1==2)?<Items icon="MD" title="Mis Datos" method={this.misDatos}/>:<View></View>}
                </View>
              </ScrollView>
            </View>)
  }

}
export default App;
