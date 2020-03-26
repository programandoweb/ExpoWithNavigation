import React, { Component } from 'react';
import { View, Text, ScrollView , TouchableOpacity, Button , TextInput } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar, Input } from 'react-native-elements';
import {Functions} from '../../helpers/';
import Config from '../../constants/Config';
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
      evaluacion: "",
      evaluacion_id2 : this.props.evaluacion_id,
      alumno_id : this.props.data.usuario_id,
      extraData:this.props.extraData,
    }
  }

  componentDidMount() {
    Functions.socket.on('actualizacion',this.actualizacion);
    Functions.socket.on('recarga_datos', this.recarga_datos);
  }

  componentWillUnmount(){
    Functions.socket.removeListener('actualizacion', this.actualizacion,true);
    Functions.socket.removeListener('recarga_datos', this.actualizacion,true);
  }

  handleCalificacion=()=>{
    Functions.postGenerico("Profesores","Calificar",this.props.methods,this,"Calificar",this.state)
  }

  extraData = (data) =>{
    this.setState({extraData:data.extraData})
  }

  recarga_datos=(respuestaSocket)=>{
    //this.setState(respuestaSocket)
  }

  actualizacion=(respuestaSocket)=>{
    this.setState({extraData:data.extraData})
  }

  render() {
    let data = this.props.data;
    let extraData=this.state.extraData;
    return (<View style={Styles.itemListFullWidth} >
              <View style={Styles.card}>
                <View style={Styles.row}>
                  <View style={Styles.col2}>
                    <Avatar
                      overlayContainerStyle={{backgroundColor: Colors.iconWhose}}
                      size="medium"
                      rounded
                      icon={{name: 'user', type: 'font-awesome'}}
                      activeOpacity={0.7}
                      source={{uri: Config.images+this.props.data.avatar}}
                    />
                  </View>
                  <View style={Styles.col8}>
                    <View>
                      <Text style={Styles.TituloLeft}>{this.props.data.nombres}</Text>
                    </View>
                    {(extraData == "nulo")?<View><View>
                        <Input
                          maxLength={3}
                          keyboardType="numeric"
                          onChangeText={(text)=>{this.setState({evaluacion:(text<6 && text>0)?text:""});}}
                          placeholder='Nota Alzanda'
                          errorStyle={{ color: 'red' }}
                          value={this.state.evaluacion}
                        />
                      </View>
                      <View>
                        <TextInput ref="textarea"
                          multiline
                          numberOfLines={6}
                          style={Styles.inputs}
                          onChangeText={(text)=>{this.setState({observacion:text});}}
                          placeholder="Observación..."
                          underlineColorAndroid='transparent'
                          value={this.state.observacion}
                        />
                      </View>
                      <View>
                        <Button onPress={()=>{this.handleCalificacion()}} title="Calificar"/>
                      </View>
                      </View>:<View>
                        <View>
                          <Text>Nota {extraData.nota}</Text>
                        </View>
                        {
                          (extraData.fecha!='')?<View>
                                                        <Text>Evaluado el {extraData.fecha}</Text>
                                                      </View>:<View/>
                        }
                        {
                          (extraData.observacion!='')?<View>
                                                        <Text>Observación {extraData.observacion}</Text>
                                                      </View>:<View/>
                        }
                      </View>
                    }
                  </View>
                </View>
              </View>
            </View>)
  }
}
export default App;
