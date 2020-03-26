import React, { Component } from 'react';
import { View, Text, ScrollView , StyleSheet, TouchableOpacity, Button, Picker, KeyboardAvoidingView, TextInput } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar, Card, Input } from 'react-native-elements';
import {Functions,Add_Evaluaciones} from '../../helpers/';
import Attachment from './Attachment';
import Calendar from './Calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends Component {
  constructor (args) {
    super(args)
    this.state = {
      evaluacion: "",
      descripcion:"",
      periodos:[1,2,3,4],
      periodo:1,
      materia:"",
      ListaDeMaterias:{},
      fecha:Functions.FechaHoy(),
      result_singleFile:{},
      singleFile:{},
      token:0,
      user:this.props.methods.state.token,
    }
    this.getInfo();
  }

  Add_Evaluaciones=()=>{

  }

  recargar_tareas = (data)=>{
    this.props.localMethods.state.method_tareas();
    this.props.localMethods.state.method_goBack();
    //console.log(this.props.navigation.goBack(););
  }

  getInfo=()=>{
    Functions.getInfo(this.props.methods,this,"ListaDeMaterias");
  }

  form=()=>{
    return <KeyboardAvoidingView behavior="padding" enabled>
              <ScrollView>
                <Card containerStyle={{ borderBottomColor:Colors.screenPrimary,
                                        borderBottomWidth:3
                                      }}>
                  <View>
                    <Input
                      onChangeText={(text)=>{this.setState({evaluacion:text});}}
                      placeholder='Evaluación'
                      errorStyle={{ color: 'red' }}
                      value={this.state.evaluacion}
                    />
                    <Picker
                      selectedValue={this.state.materia}
                      style={{height: 50, marginTop: 10 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({materia: itemValue})
                      }>
                      {Object.entries(this.state.ListaDeMaterias).map((v,k) => {
                        return <Picker.Item label={v[1]} value={v[0]} key={k} />
                      })}
                    </Picker>
                    <Picker
                      selectedValue={this.state.periodo}
                      style={{height: 50, marginTop: 10, marginBottom: 10 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({periodo: itemValue})
                      }>
                      {
                        this.state.periodos.map((v,k) => {
                          return <Picker.Item label={"Período "+v} value={v} key={k} />
                        })
                      }
                    </Picker>
                    <View >
                      <TextInput ref="textarea"
                        multiline
                        numberOfLines={6}
                        style={Styles.inputs}
                        onChangeText={(text)=>{this.setState({descripcion:text});}}
                        placeholder="Comentario..."
                        underlineColorAndroid='transparent'
                        value={this.state.descripcion}
                      />
                    </View>
                    <Calendar Object={this}/>
                    <Attachment Object={this}  styles={styles}/>
                    <View style={{marginTop: 10}}>
                      <Button onPress={()=>{Functions.Add_Evaluaciones(this)}}
                              icon={
                                    <Icon
                                      name="save"
                                      size={15}
                                      color="white"
                                      style={{marginRight:10}}
                                    />
                              }
                              title="Crear o Guardar Tarea"
                      />
                    </View>
                  </View>
                </Card>
              </ScrollView>
            </KeyboardAvoidingView>
  }

  render() {
    //console.log(this.state);
    return (this.form())
  }
}
export default App;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  filler:{
    height: 'Keyboard Height'
  },
  container:{
    flex:1
  },
  date:{
    fontSize:14,
    marginBottom: 20,
  },
  email:{
    fontSize:10,
  },
  mr:{
    marginRight: 10
  },
  title:{
    fontSize:11,
    fontWeight: 'bold',
  },
  list:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#ddd",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5,
    marginRight:5,
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputContainerNoColors: {
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
  },
  inputIcons: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    width:40,
    marginRight:5,
    marginLeft: 5,
    alignItems:'center',
    padding: 10,
    textAlign: 'center',
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:5,
  },
  select:{

  },
  textarea:{
    borderWidth: 1,
    borderColor: "#d2d2d2",
    padding: 5,
  }
});
