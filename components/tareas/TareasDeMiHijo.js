import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity   } from 'react-native';
import {Colors,Sizes,Styles,ItemVacio} from '../../constants/';
import { Avatar } from 'react-native-elements';
import ItemsTareasDeMiHijo from './ItemsTareasDeMiHijo';
import {Functions} from '../../helpers/';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserProvider from '../../contextUser';


class App extends Component {

  static contextType  = UserProvider

  constructor (args) {
    super(args)
    this.state = {
      evaluaciones: [],
      ListaTareasDeMiHijo:[],
      grado_escolar_token:this.props.localMethods.state.grado_escolar_token,
      socketIsMounted:false,
    }
  }

  componentDidMount() {
    Functions.get(this.context,this,"ListaTareasDeMiHijo",this.state.grado_escolar_token);
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
    Functions.get(this.context,this,"ListaTareasDeMiHijo",this.state.grado_escolar_token);
  }

  render() {
    let item  = this.state;
    return (<ScrollView style={Styles.body}>
              {(this.state.ListaTareasDeMiHijo.length>0)?this.state.ListaTareasDeMiHijo.map((v,k) =>{return <ItemsTareasDeMiHijo methods={this.props.methods}  data={v} key={k}/>}) :<ItemVacio/>}
            </ScrollView>
    )
  }

}
export default App;
