import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity   } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Items from './Items';
import ItemsHijos from './ItemsHijos';
import {Functions} from '../../helpers/';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserProvider from '../../contextUser';
import Loading from '../../components/common/Loading';


let getInfo;

class App extends Component {

  static contextType  = UserProvider

  _isMounted      = false;
  constructor (args) {
    super(args)
    this.state = {
      tipo_usuario_id:this.props.methods.state.user.tipo_usuario_id,
      play:{},
      loading:false,
    }
  }

  componentDidMount() {
    this._isMounted = true;
    /*ESTE ES EL SONIDO DEL CLICK*/
    //this.setState({play:this.context.Sounds.play})
    this.setState({loading:true})
    switch (this.context.tipo_usuario_id) {
      case "4":
        Functions.get(this.context,this,"ListaDeGrados,ListaDeEvaluaciones",this.state.grado_escolar_token);
      break;
      case "5":
        Functions.get(this.context,this,"ListaAlumnoAcudiente",this.state.grado_escolar_token);
      break;
    }
    Functions.socket.on('actualizacion',this.actualizacion);

  }

  componentWillUnmount(){
    this._isMounted = false;
    Functions.socket.removeListener('actualizacion', this.actualizacion,true);
  }

  actualizacion=(respuestaSocket)=>{
    this.setState(respuestaSocket)
  }

  handleClick=()=>{
    this.props.navigation.navigate('NuevaTareas')
    this.props.localMethods.updateState({ headerTitle:"Nueva tarea",
                                          backgroundColor:Colors.screenPrimary,
                                          method_tareas:this.getInfo,
                                          method_goBack:this.props.navigation.goBack,
                                          Functions:Functions.getInfo,
                                        });
  }

  tareas_header=()=>{
    return <View style={{backgroundColor: Colors.screenPrimary, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
      <View style={{ alignItems: 'center' ,}}>
        <Avatar
          size="xlarge"
          rounded
          icon={{color: Colors.iconPrimary, name: 'book', type: 'font-awesome'}}
          overlayContainerStyle={{backgroundColor: Colors.iconBgPrimary, borderWidth: 10, borderColor: Colors.screenPrimary,}}
          activeOpacity={0.7}
        />
      </View>
      <View style={{flexDirection: 'row',}}>
        <Text style={{  color:Colors.textPrimary , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20, flex: 0.8}}>
          Tareas
        </Text>
      </View>
    </View>
  }
  tareas_acudientes=()=>{
    return <View style={{ flex: 1,}}>
              {this.tareas_header()}
              <ScrollView style={Styles.body}>
                <View style={Styles.row}>
                  {(this.state!=undefined && this.state.ListaAlumnoAcudiente!=undefined)?Object.entries(this.state.ListaAlumnoAcudiente).map((v,k) => {
                    return <ItemsHijos
                                      Functions={Functions.getInfo}
                                      navigation={this.props.navigation}
                                      key={k}
                                      titulo={Colors.textPrimary}
                                      data={v}
                                      extraData={this.state}
                                      methods={this.props.localMethods}/>
                    }):<View/>
                  }
                </View>
              </ScrollView>
            </View>
  }
  tareas_profesores=()=>{
    return <View style={{ flex: 1,}}>
              {this.tareas_header()}

              <ScrollView style={Styles.body}>
                <View style={Styles.row}>
                  {(this.state!=undefined && this.state.ListaDeGrados!=undefined)?Object.entries(this.state.ListaDeGrados).map((v,k) => {
                      return <Items navigation={this.props.navigation}
                                    key={k}
                                    titulo={Colors.textPrimary}
                                    data={v}
                                    extraData={this.state}
                                    methods={this.props.localMethods}/>
                      }):<View/>
                  }
                </View>
              </ScrollView>
              {(this.props.methods.state.user.tipo_usuario_id==4)?<TouchableOpacity  onPress={()=>{this.handleClick()}} style={Styles.ButtonfloatRight}>
                  <View>
                    <Avatar
                      size={70}
                      rounded
                      icon={{color: Colors.iconBgPrimary, name: 'plus', type: 'font-awesome'}}
                      overlayContainerStyle={{backgroundColor: Colors.iconPrimary, borderWidth: 1, borderColor: Colors.screenPrimary}}
                      activeOpacity={0.7}
                    />
                  </View>
                </TouchableOpacity >:<View></View>
              }
            </View>
  }



  render() {
    if (this.state.loading) {
      return(<View>{this.tareas_header()}<Loading/></View>)
    }else {
      switch (this.state.tipo_usuario_id) {
        case "4":
        return (this.tareas_profesores())
        break;
        case "5":
        return (this.tareas_acudientes())
        break;
        default:
        return (this.tareas_header())
      }
    }
  }

}
export default App;
