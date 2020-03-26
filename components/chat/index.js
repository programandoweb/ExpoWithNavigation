import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Config,Colors,Sizes,Styles,ItemVacio} from '../../constants/';
import Textarea from './Textarea';
import ItemList from './Items';
import {Functions} from '../../helpers/';
import socketIO from 'socket.io-client';
import UserProvider from '../../contextUser';
import Loading from '../../components/common/Loading';

let socket;

class App extends Component {

  static contextType  = UserProvider

  constructor (args) {
    super(args)
    this.state = {
      token:this.props.id,
      mensajes:[],
      loading:false,
    }
  }

  componentDidMount() {
    socket = socketIO(Config.socket, {
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
    this.setState({token:this.props.id})
    this.getInfo();
  }

  componentWillUnmount(){
    socket.removeListener('actualizar_mensaje_a_todos');
  }

  actualizar_mensaje_a_todos=(data)=>{
    if (data.data!=undefined && data.data.token==this.props.id) {
      let messages  =  this.state.mensajes;
      messages.push(data.data);
      this.setState({mensajes: messages})
      setTimeout(() => this.props.scrollToBottom(), 500)
    }
  }

  getInfo=()=>{
    this.setState({loading:true})
    Functions.getInfoGenerico("Chat","GetComments",this.props.methods,this,"Comentarios",this.props.id);
  }

  send  = (Object)  =>{
    let ObjectEnvio = {
      mensaje:Object.descripcion,
      token_commentario:this.props.id,
      callBack:"actualizar_chat",
    }
    //console.log(ObjectEnvio);
    Functions.postGenerico("Chat","SetComments",this.props.methods,this,"Comentarios",ObjectEnvio);
  }


  actualizar_chat=(data)=>{
    this.state.socket.emit('enviar_mensaje_a_todos',data);
  }

  _itemsList=()=>{
    return (this.state.mensajes.length>0)?this.state.mensajes.map((v,k)=>{return <ItemList yo={this.context} key={k} data={v}/>}):<ItemVacio count={this.state.mensajes} message="Aún no hay mensajes"/>
  }

  chat = () =>{
    return    <View style={Styles.itemListFullWidth}>
                <View style={Styles.cardLeft}>
                  <Text style={Styles.h4}>Comentarios ( {this.state.mensajes.length} ) Id:{this.props.id}</Text>
                </View>
                {(this.state.loading)?<Loading/>:this._itemsList()}
                <Textarea methods={this} />
              </View>

  }

  render() {
    return(this.chat())
  }
}

export default App;
