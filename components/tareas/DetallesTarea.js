import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button,Linking ,KeyboardAvoidingView} from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chat from '../chat/';

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {

    }
  }

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 1;

  scrollToBottom = () => {
    this.refs.scrollView.scrollToEnd({animated: true})
  };

  render() {
    let item  = this.props.localMethods.state.detalle;
    return (<KeyboardAvoidingView
                style={{paddingBottom: 100, flex: 1,}}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}
              >
              <ScrollView ref="scrollView">
                <View style={Styles.row}>
                  <View style={Styles.itemListFullWidth}>
                    <View style={Styles.cardLeft}>
                      <View>
                        <Text>
                          {item.evaluacion}
                        </Text>
                      </View>
                      <View>
                        <Text >
                          Fecha: {item.fecha}
                        </Text>
                      </View>
                      <View style={{marginBottom: 20,}}>
                        <Text style={Styles.left}>{item.descripcion}</Text>
                      </View>
                      {(item.biblioteca!=undefined && item.biblioteca!='')?
                        <Button icon={<Icon name="cloud-download"  size={20} color="#fff"/>}
                            title="Material de Apoyo"
                            onPress={()=>{Linking.openURL(item.biblioteca)}}
                        />:<Text></Text>}
                    </View>
                  </View>
                  <Chat id={item.id} scrollToBottom={this.scrollToBottom}  methods={this.props.methods}/>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )
  }
}
export default App;
