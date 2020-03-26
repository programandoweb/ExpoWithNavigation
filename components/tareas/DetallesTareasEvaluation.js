import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button,Linking ,KeyboardAvoidingView} from 'react-native';
import {Colors,Sizes,Styles,ItemVacio} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Functions} from '../../helpers/';
import Chat from '../chat/';
import Items from './ItemsAlumnos';
import UserProvider from '../../contextUser';
import Loading from '../../components/common/Loading';

class App extends Component {

  static contextType  = UserProvider

  constructor (args) {
    super(args)
    this.state = {
      ListaDeAlumnosAsistenciaSinAsistencia:{Lista_Alumnos:[]},
      NotasEvaluacion:[],
      loading:false,
    }
  }

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 1;

  scrollToBottom = () => {
    this.refs.scrollView.scrollToEnd({animated: true})
  };

  componentDidMount() {
    this.get();
    Functions.socket.on('actualizacion',this.actualizacion);
    Functions.socket.on('recarga_datos', this.recarga_datos);
  }

  componentWillUnmount(){
    Functions.socket.removeListener('actualizacion', this.actualizacion,true);
  }

  get=()=>{
    let id = this.props.localMethods.state.detalle.materia_token+"::"+this.props.localMethods.state.detalle.grado_escolar_id+"::"+this.props.localMethods.state.detalle.seccion+"::"+this.props.localMethods.state.detalle.evaluacion_id;
    Functions.get(this.context,this,"ListaDeAlumnosAsistenciaSinAsistencia,NotasEvaluacion",id);
  }

  actualizacion=(respuestaSocket)=>{
    this.setState(respuestaSocket)
  }

  recarga_datos=(respuestaSocket)=>{
    this.setState(respuestaSocket)
  }

  __render=()=>{
    return <View >
            {(  this.state.ListaDeAlumnosAsistenciaSinAsistencia!=undefined && this.state.ListaDeAlumnosAsistenciaSinAsistencia.Lista_Alumnos!=undefined)?
                this.state.ListaDeAlumnosAsistenciaSinAsistencia.Lista_Alumnos.map((v,k) => {
                  return <Items key={k}
                                methods={this.props.methods}
                                titulo={Colors.textWhose}
                                get={this.get}
                                data={v}
                                evaluacion_id={this.props.localMethods.state.detalle.evaluacion_id}
                                extraData={(this.state.NotasEvaluacion[v.usuario_id]!=undefined)?this.state.NotasEvaluacion[v.usuario_id]:"nulo"}/>
                }):<ItemVacio/>}
            </View>
  }

  render() {
    let item  = this.props.localMethods.state.detalle;
    return (<KeyboardAvoidingView
                style={{paddingBottom: 100, flex: 1,}}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}
              >
              <ScrollView ref="scrollView">
                <View style={Styles.row}>
                  <View style={Styles.itemListFullWidth}>
                    <View style={Styles.cardLeft}>
                      <View>
                        <Text>
                          {item.evaluacion}
                        </Text>
                      </View>
                      <View>
                        <Text >
                          Fecha: {item.fecha}
                        </Text>
                      </View>
                      <View style={{marginBottom: 20,}}>
                        <Text style={Styles.left}>{item.descripcion}</Text>
                      </View>
                      {(item.biblioteca!=undefined && item.biblioteca!='')?
                        <Button icon={<Icon name="cloud-download"  size={20} color="#fff"/>}
                            title="Material de Apoyo"
                            onPress={()=>{Linking.openURL(item.biblioteca)}}
                        />:<Text></Text>}
                    </View>
                  </View>
                </View>
                {(this.state.loading)?<View style={{marginTop: 10,}}><Loading/></View>:this.__render()}
              </ScrollView>
            </KeyboardAvoidingView>
          )
  }
}
export default App;
