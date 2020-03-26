import React, { Component } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import {Colors,Sizes,Styles,ItemVacio} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Items from './Items';
import {Functions} from '../../helpers/';
import UserProvider from '../../contextUser';
import Loading from '../../components/common/Loading';

class App extends Component {

  static contextType  = UserProvider

  constructor (args) {
    super(args)
    this.state = {
      ListaDeMisAlumnos:[],
      loading:false,
    }
  }

  componentDidMount() {
    Functions.get(this.context,this,"ListaDeMisAlumnos","");
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

  __render=()=>{
    return <ScrollView style={Styles.body}>
              <View style={Styles.row}>
                {(this.state!=undefined && this.state.ListaDeMisAlumnos!=undefined)?this.state.ListaDeMisAlumnos.map((v,k) => { return <Items navigation={this.props.navigation} key={k} titulo={Colors.textThird} data={v} extraData={this.state} methods={this.props.localMethods} handleClick={this.handleClick}/>}):<ItemVacio/>}
              </View>
            </ScrollView>
  }

  render() {
    return (<View style={{ flex: 1,}}>
              <View style={{backgroundColor: Colors.screenThird, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
                <View style={{ alignItems: 'center' ,}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    icon={{color: Colors.iconThird, name: 'child', type: 'font-awesome'}}
                    overlayContainerStyle={{backgroundColor: Colors.iconBgThird, borderWidth: 10, borderColor: Colors.screenThird}}
                    activeOpacity={0.7}
                  />
                </View>
                <Text style={{  color:Colors.textThird , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20,}}>Alumnos</Text>
              </View>
              {(this.state.loading)?<Loading/>:this.__render()}
            </View>)
  }

}
export default App;
