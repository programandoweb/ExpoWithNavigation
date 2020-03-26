import React, { Component } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Items from './Items';
import {Functions} from '../../helpers/';
import UserProvider from '../../contextUser';

class App extends Component {

  static contextType  = UserProvider

  constructor (args) {
    super(args)
  }

  componentDidMount() {
    Functions.get(this.context,this,"ListaProfesores","");
    Functions.socket.on('actualizacion',this.actualizacion);
    Functions.socket.on('recarga_datos',this.recarga_datos);
  }

  componentWillUnmount(){
    Functions.socket.removeListener('actualizacion', this.actualizacion,true);
    Functions.socket.removeListener('recarga_datos', this.recarga_datos,true);
  }

  actualizacion=(respuestaSocket)=>{
    this.setState(respuestaSocket)
  }

  recarga_datos=()=>{
    Functions.get(this.context,this,"ListaProfesores","");
  }

  render() {
    return (<View style={{ flex: 1,}}>
              <View style={{backgroundColor: Colors.screenThird, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
                <View style={{ alignItems: 'center' ,}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    icon={{color: Colors.iconThird, name: 'users', type: 'font-awesome'}}
                    overlayContainerStyle={{backgroundColor: Colors.iconBgThird, borderWidth: 10, borderColor: Colors.screenThird}}
                    activeOpacity={0.7}
                  />
                </View>
                <Text style={{  color:Colors.textThird , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20,}}>Profesores</Text>
              </View>
              <ScrollView style={Styles.body}>
                <View style={Styles.row}>
                  {(this.state!=undefined && this.state.ListaProfesores!=undefined)?this.state.ListaProfesores.map((v,k) => { return <Items navigation={this.props.navigation} key={k} titulo={Colors.textThird} data={v} extraData={this.state} methods={this.props.localMethods} handleClick={this.handleClick}/>}):<View/>}
                </View>
              </ScrollView>
            </View>)
  }

}
export default App;
