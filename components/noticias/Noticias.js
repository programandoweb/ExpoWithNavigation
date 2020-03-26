import React, { Component } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Items from './Items';
import {Functions} from '../../helpers/';

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
    }
    this.getInfo();
  }

  // componentDidMount() {
  //   this.getInfo();
  // }
  //
  // componentWillUnmount(){
  //   this.getInfo();
  // }

  getInfo=()=>{
    Functions.getInfo(this.props.methods,this,"ListaDeGrados,ListaDeEvaluaciones")
  }

  handleClick=(data)=>{
    console.log(data);
  }

  render() {
    return (<View style={{ flex: 1,}}>
              <View style={{backgroundColor: Colors.screenSecondary, height: Sizes.xxs, paddingTop: 40, marginBottom: 140,}}>
                <View style={{ alignItems: 'center' ,}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    icon={{color: Colors.iconSecondary, name: 'book', type: 'font-awesome'}}
                    overlayContainerStyle={{backgroundColor: Colors.iconBgSecondary, borderWidth: 10, borderColor: Colors.screenSecondary}}
                    activeOpacity={0.7}
                  />
                </View>
                <Text style={{  color:Colors.textSecondary , fontSize:Sizes.h3, textTransform:'capitalize', paddingLeft: 20,}}>Noticias</Text>
              </View>
              <ScrollView style={Styles.body}>
                <View style={Styles.row}>
                  {(this.state!=undefined && this.state.ListaDeGrados!=undefined)?Object.entries(this.state.ListaDeGrados).map((v,k) => { return <Items navigation={this.props.navigation} key={k} titulo={Colors.textSecondary} data={v} extraData={this.state} methods={this.props.localMethods} handleClick={this.handleClick}/>}):<View/>}
                </View>
              </ScrollView>
            </View>)
  }

}
export default App;
