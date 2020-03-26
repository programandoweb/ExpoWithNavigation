import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Config from '../../constants/Config';

class App extends Component {
  constructor (args) {
    super(args)
    this.state = {
      headerMode:this.props.methods.state.headerMode,
      headerTitle:"",
      backgroundColor:"#ffffff",
      cardStyle:"#fff",
      data:{}
    };
  }

  handleClick=()=>{
    this.props.navigation.navigate('DetallesAlumno')
    this.props.methods.updateState({headerMode:"screen",headerTitle:this.props.data.alumno,backgroundColor:Colors.screenThird,dataAlumno:this.props.data,})
  }
  render() {
    let data  = this.props.data;
    return (  <TouchableOpacity style={Styles.itemList} onPress={()=>this.handleClick()}>
              <View style={Styles.card}>
                <View style={Styles.header}>
                  <Avatar
                    overlayContainerStyle={{backgroundColor: Colors.screenWhose}}
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    source={{uri: Config.images+data.avatar}}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={Styles.Body}>
                  <Text style={Styles.Titulo}>{data.alumno}</Text>
                  <Text style={Styles.SubTitulo}>{data.grado}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
  }
}
export default App;
