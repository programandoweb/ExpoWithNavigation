import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar,Button } from 'react-native-elements';
import {Functions} from '../../helpers/';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserProvider from '../../contextUser';
import Loading from '../../components/common/Loading';


class App extends Component {

  static contextType  = UserProvider


  constructor (args) {
    super(args)
    this.state = {
      ListaDeAlumnosAsistencia: {},
      loading:false,
      loading_btn:false,
    }
  }


  componentDidMount() {
    let id = this.props.localMethods.state.asistencia_clase.materia_token+"::"+this.props.localMethods.state.asistencia_clase.grado_escolar_id+"::"+this.props.localMethods.state.asistencia_clase.seccion;
    Functions.get(this.context,this,"ListaDeAlumnosAsistencia",id);
    Functions.socket.on('actualizacion',this.actualizacion);
  }

  componentWillUnmount(){
    Functions.socket.removeListener('actualizacion', this.actualizacion,true);
  }

  actualizacion=(respuestaSocket)=>{
    this.setState(respuestaSocket)
  }

  handleClick=(key,value,bool)=>{
    this.context.Sounds.play()
    this.setState({loading_btn:true})
    const vector  = this.state.ListaDeAlumnosAsistencia.asistencias_hoy;
    const materia = this.props.localMethods.state.asistencia_clase.materia;
    const title   = value.nombres;
    const message = (bool==0)?"está inasistente en "+materia:"Asistió sin novedad a "+materia;
    if (bool==0) {
        vector[value.usuario_id]  = "card4";
        value["asistio"]          = 0;
    }else {
        vector[value.usuario_id] = "card2";
        value["asistio"]          = 1;
    }

    value["alumnos"]      = JSON.stringify(this.state.ListaDeAlumnosAsistencia.asistencias_hoy);
    value["materia_token"]= this.props.localMethods.state.asistencia_clase.materia_token;
    value["title"]        = title;
    value["message"]      = message;
    //this.setState({ asistencias_hoy: vector });
    Functions.post(this.props.methods,this,"marcar_asistencia",value);
  }

  getInfo=()=>{
    let id = this.props.localMethods.state.asistencia_clase.materia_token+"::"+this.props.localMethods.state.asistencia_clase.grado_escolar_id+"::"+this.props.localMethods.state.asistencia_clase.seccion;
    Functions.getInfo(this.props.methods,this,"ListaDeAlumnosAsistencia",id)
  }

  __botones=(k,v)=>{
    return <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.5, margin: 5, }}>
                <Button
                  buttonStyle={{backgroundColor: Colors.iconWhose}}
                  onPress={()=>this.handleClick(k,v,1)}
                  icon={
                    <Icon
                      style={{padding: 5,}}
                      name="thumbs-o-up"
                      size={15}
                      color="white"
                      />
                  }
                  />
              </View>
              <View style={{flex: 0.5, margin: 5, }}>
                <Button
                  buttonStyle={{backgroundColor: "#333"}}
                  onPress={()=>this.handleClick(k,v,0)}
                  icon={
                    <Icon
                      style={{padding: 5,}}
                      name="thumbs-o-down"
                      size={15}
                      color="white"
                      />
                  }
                  />
              </View>
            </View>
  }

  render() {
    if (this.state.loading) {
      return(<Loading/>)
    }else {
      return (<ScrollView>
        <View style={Styles.row}>
          {
            (this.state.ListaDeAlumnosAsistencia!=undefined && this.state.ListaDeAlumnosAsistencia.Lista_Alumnos!=undefined)?this.state.ListaDeAlumnosAsistencia.Lista_Alumnos.map((v,k)=>{
              let asistencias_hoy = this.state.ListaDeAlumnosAsistencia.asistencias_hoy[v.usuario_id]
              return (
                <View key={k} style={Styles.itemList} >
                  <View style={(Styles[asistencias_hoy]!=undefined)?Styles[asistencias_hoy]:Styles.card3}>
                    <View style={Styles.header}>
                      <Avatar
                        overlayContainerStyle={{backgroundColor: Colors.iconWhose}}
                        size="medium"
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        activeOpacity={0.7}
                        />
                    </View>
                    <View style={Styles.Body}>
                      <Text style={Styles.center}>{v.nombres}</Text>
                    </View>
                    {(this.state.loading_btn)?<Loading/>:this.__botones(k,v)}
                  </View>
                </View>
              )
            }):<Text></Text>
          }
        </View>
      </ScrollView>
    )
    }
  }
}
export default App;
