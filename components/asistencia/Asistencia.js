import React, { Component } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
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
      ListaDeAsistencia:[],
      loading:false,
    }
  }

  componentDidMount() {
    Functions.get(this.context,this,"ListaDeAsistencia","");
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
                {(this.state!=undefined && this.state.ListaDeAsistencia!=undefined)?this.state.ListaDeAsistencia.map((v,k) => { return <Items navigation={this.props.navigation} key={k} titulo={Colors.textWhose} data={v} extraData={this.state} methods={this.props.localMethods} handleClick={this.handleClick}/>}):<View/>}
              </View>
            </ScrollView>
  }

  render() {
    return (<View style={{ flex: 1,}}>
              <View style={{backgroundColor: Colors.screenWhose, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
                <View style={{ alignItems: 'center' ,}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    icon={{color: Colors.iconWhose, name: 'list-ol', type: 'font-awesome'}}
                    overlayContainerStyle={{backgroundColor: Colors.iconBgWhose, borderWidth: 10, borderColor: Colors.screenWhose}}
                    activeOpacity={0.7}
                  />
                </View>
                <Text style={{  color:Colors.textWhose , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20,}}>Asistencia</Text>
              </View>
              {(this.state.loading)?<Loading/>:this.__render()}
            </View>)
  }

}
export default App;
