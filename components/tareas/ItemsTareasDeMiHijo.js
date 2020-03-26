import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button,Linking,KeyboardAvoidingView } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Chat from '../chat/';

class App extends Component {
  constructor (args) {
    super(args)
  }

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 1;

  scrollToBottom = () => {
    this.refs.scrollView.scrollToEnd({animated: true})
  };

  render() {
    return (<KeyboardAvoidingView
                style={{paddingBottom: 100, flex: 1,}}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}
              >
              <ScrollView ref="scrollView">
                <View style={Styles.itemListFullwidth}>
                  <View style={Styles.cardLeft}>
                    <View>
                      <Text style={Styles.TituloLeft}>{this.props.data.evaluacion}</Text>
                      <Text style={Styles.SubTitulo}>{this.props.data.descripcion}</Text>
                    </View>
                    {(this.props.data.biblioteca!=undefined && this.props.data.biblioteca!='')?
                      <Button icon={<Icon name="cloud-download"  size={20} color="#fff"/>}
                          title="Material de Apoyo"
                          onPress={()=>{Linking.openURL(this.props.data.biblioteca)}}
                      />:<Text></Text>}
                    <View >
                      <Text style={Styles.SubTituloLeft}>Nota alcanzada: {this.props.data.evaluacion_nota}</Text>
                      <Text style={Styles.SubTituloLeft}>Fecha corregido: {this.props.data.evaluacion_fecha}</Text>
                      <Text style={Styles.SubTituloLeft}>Observación: {this.props.data.evaluacion_observacion}</Text>
                    </View>
                  </View>
                  <Chat id={this.props.data.token} scrollToBottom={this.scrollToBottom}  methods={this.props.methods}/>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            )
  }
}
export default App;
