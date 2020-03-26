import React, { Component } from 'react';
import { StyleSheet, YellowBox , Platform, BackHandler , View, Text, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import {Config,State,IgnoreWarnings,Styles} from './constants/';
import {Storage} from './helpers/';
import {Acudientes,Alumnos,Profesores,Psicorientador,Rectores,Login} from './usuarios/';
import Loading from './components/common/Loading';
import registerForPushNotifications from './registerForPushNotificationsAsync';
import UserProvider from './contextUser';
import Sounds from './constants/Sounds';

YellowBox.ignoreWarnings(IgnoreWarnings);

const _Storage  = Storage.St;
const styles    = Styles;
class App extends Component {

  constructor (args) {
    super(args)
    this.state =  State;

  }

  componentDidMount() {
    this.cheq_session();
    this.setState({ListaAlumnoAcudiente:{}})
    Sounds.init();
  }

  componentWillUnmount(){
    registerForPushNotifications()
    Sounds.init();
  }

  play=()=>{
    Sounds.play()
  }

  handlerLogOut = ()  =>{
    _Storage.clear(this)
  }

  sobre_escribir_el_estado  = (data)  =>  {
    this.setState(data);
  }

  recargar_tareas = (response)=>{
    //this.refs.childMethod.handleChageScreen("ListaDeEvaluaciones",true)
  }

  actualizar_tareas = (response)=>{
    if (response.response.data!=undefined) {
      this.sobre_escribir_el_estado(response.response.data);
    }
  }

  getState=()=>{
    return this.state;
  }

  cheq_session=()=>{
    this.sobre_escribir_el_estado({loading:true});
    if (this.state.user.usuario_id==undefined) {
      const result    =   _Storage.get("user");
      let   setState  =   this.sobre_escribir_el_estado;
      result.then((data)=>{
        if (data==null) {
          _Storage.clear(this)
          setState(State)
          return console.log(_Storage,"Detenido...");
        }
        let __data=JSON.parse(data);
            __data["user"].Sounds  =  Sounds;
            setState(__data)
        this.sobre_escribir_el_estado({loading:false});
        if (__data!=null) {
          if (Platform.OS!='web') {
            registerForPushNotifications(__data);
          }
        }
      })
    }
  }

  _render=()=>{
    if (this.state.user.usuario_id!=undefined && this.state.user.usuario_id>0) {
      switch (this.state.user.usuarios) {
        case "Rectores":
          return <Rectores methods={this} styles={styles}/>
        break;
        case "Alumnos":
          return <Alumnos methods={this} styles={styles}/>
        break;
        case "Administrativos":
          return <Administrativos methods={this} styles={styles}/>
        break;
        case "Profesores":
          return <Profesores methods={this} styles={styles}/>
        break;
        case "Acudientes":
          return <Acudientes methods={this} styles={styles}/>
        break;
        case "Secretaria":
          return <Secretaria methods={this} styles={styles}/>
        break;
        case "Psicorientador":
          return <Psicorientador methods={this} styles={styles}/>
        break;
        default:
        return <Profesores methods={this} styles={styles}/>
      }
    }else {
      return <Login methods={this}/>
    }
  }

  render() {
    if (this.state.loading) {
       return (<Loading/>)
    }else {
       return ( <UserProvider.Provider value={this.state.user}>{this._render()}</UserProvider.Provider>)
    }
  }
}

export default App;
