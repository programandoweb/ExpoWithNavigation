import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';

class App extends Component {
  constructor (args) {
    super(args)
    this.state = {
      list: this.props.localMethods.state.list,
    }
  }

  handleClickEvaluation=(key,value)=>{
    this.props.navigation.navigate('TareasEvaluation',{data:{"key":key,"value":value}})
    this.props.localMethods.updateState({headerMode:"screen",headerTitle:value.evaluacion,backgroundColor:Colors.screenPrimary,detalle:value,})
  }

  handleClick=(key,value)=>{
    this.props.navigation.navigate('DetallesTarea',{data:{"key":key,"value":value}})
    this.props.localMethods.updateState({headerMode:"screen",headerTitle:value.evaluacion,backgroundColor:Colors.screenPrimary,detalle:value,})
  }

  render() {
    return (<ScrollView>
              <View style={Styles.row}>
              {
                (this.state.list!=undefined && this.state.list.length>0)?this.state.list.map((v,k)=>{
                  return (
                    <View key={k} style={Styles.itemList} onPress={()=>this.handleClick(k,v)}>
                      <View style={Styles.card}>
                        <View style={Styles.header}>
                          <Avatar
                            overlayContainerStyle={{backgroundColor: Colors.screenPrimary}}
                            size="medium"
                            rounded
                            icon={{name: 'book', type: 'font-awesome'}}
                            activeOpacity={0.7}
                          />
                        </View>
                        <View style={Styles.Body}>
                          <Text>{ v.evaluacion }</Text>
                        </View>
                        <View style={Styles.row}>
                          <TouchableOpacity style={Styles.btnTaskTab} onPress={()=>this.handleClick(k,v)}>
                            <Avatar

                              size="small"
                              rounded
                              icon={{name: 'search', type: 'font-awesome'}}
                              activeOpacity={0.7}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity style={Styles.btnTaskTab} onPress={()=>this.handleClickEvaluation(k,v)}>
                            <Avatar
                              overlayContainerStyle={{backgroundColor: Colors.screenPrimary}}
                              size="small"
                              rounded
                              icon={{name: 'edit', type: 'font-awesome'}}
                              activeOpacity={0.7}
                            />
                          </TouchableOpacity>
                        </View>
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
export default App;
