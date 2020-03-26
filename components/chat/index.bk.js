import React, { Component } from 'react';
import { StyleSheet, View, Text ,KeyboardAvoidingView} from 'react-native';
import {Config,Colors,Sizes,Styles} from '../../constants/';
import Textarea from './Textarea';
import ItemList from './Items';
import {Functions} from '../../helpers/';
import socketIO from 'socket.io-client';
class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
      token:this.props.id,
      mensajes:[],
    }
    this.getInfo();
  }

  componentDidMount() {
    const socket = socketIO(Config.socket, {
      transports: ['websocket'],
      jsonp: false,
      rejectUnauthorized: false,
    });
    socket.connect();
    socket.on('connect', () => {
      this.setState({socket:socket,});
      //console.log("Conectado a Colombia " + Config.socket);
    });
    socket.on('actualizar_mensaje_a_todos', this.actualizar_mensaje_a_todos);
  }

  componentWillUnmount(){
    this.state.socket.removeListener('actualizar_mensaje_a_todos');
  }

  actualizar_mensaje_a_todos=(data)=>{
    if (data.data!=undefined) {
      let messages  =  this.state.mensajes;
      messages.push(data.data);
      this.setState({mensajes: messages})
    }
    // if (data.data[1].mensaje_app!=undefined) {
    //   data.data[1].mensaje=data.data[1].mensaje_app;
    //   data.data[1].type=(data.data[1].type)?data.data[1].type:"text";
    // }
    // let methods   = this.props.methods;
    // let messages  =  this.props.state.messages;
    // messages.push(data.data[1]);
    // methods.sobre_escribir_el_estado({messages: messages});
    // setTimeout(() => this.refs.scrollView.scrollToEnd({animated: true}), 400)
  }

  getInfo=()=>{
    Functions.getInfoGenerico("Chat","GetComments",this.props.methods,this,"Comentarios",this.state.token);
  }

  send  = (Object)  =>{
    let ObjectEnvio = {
      mensaje:Object.descripcion,
      token_commentario:this.state.token,
      callBack:"actualizar_chat",
    }
    Functions.postGenerico("Chat","SetComments",this.props.methods,this,"Comentarios",ObjectEnvio);
  }


  actualizar_chat=(data)=>{
    this.state.socket.emit('enviar_mensaje_a_todos',data);
  }

  chat = () =>{
    return  <KeyboardAvoidingView style={{flexDirection: 'row'}} behavior="padding" enabled KeyboardAvoidingView>
              <View style={Styles.itemListFullWidth}>
                <View style={Styles.cardLeft}>
                  <Text style={Styles.h4}>Comentarios</Text>
                </View>
                {
                  (this.state.mensajes.length>0)?this.state.mensajes.map((v,k)=>{return <ItemList key={k} data={v}/>}):<View style={Styles.cardComment}><Text>No Hay Comentarios</Text></View>
                }
                <Textarea methods={this} />
              </View>
            </KeyboardAvoidingView>
  }

  render() {
    return(this.chat())
  }
}

export default App;
