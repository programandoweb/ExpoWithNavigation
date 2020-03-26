import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button,KeyboardAvoidingView  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Config from '../../constants/Config';
import Chat from '../chat/';

class App extends Component {
  constructor (args) {
    super(args)
    this.state = {
      dataAlumno: this.props.localMethods.state.list,
    }
  }

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 1;

  scrollToBottom = () => {
    this.refs.scrollView.scrollToEnd({animated: true})
  };

  render() {
    let data =  this.props.localMethods.state.dataAlumno
    return (  <KeyboardAvoidingView
                style={{paddingBottom: 100, flex: 1,}}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}
              >
                <ScrollView ref="scrollView">
                  <View>
                    <View style={Styles.row}>
                      <TouchableOpacity style={Styles.itemListFullWidth}>
                        <View style={Styles.card}>
                          <Avatar
                            size="xlarge"
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            source={{uri: Config.images+data.avatar}}
                          />
                          <View>
                            <Text>
                              Teléfono {data.telefono}
                            </Text>
                          </View>
                          <View>
                            <Text>
                              {data.grado} {data.seccion}
                            </Text>
                          </View>
                          <View>
                            <Text>
                              Acudiente {data.acudiente}
                            </Text>
                          </View>
                          <View>
                            <Text>
                              Acudiente {data.acudiente_telefono}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Chat id={data.grado_escolar_token+"::"+data.id} scrollToBottom={this.scrollToBottom}  methods={this.props.methods}/>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
          )
  }
}
export default App;
