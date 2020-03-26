import React, { Component } from 'react';
import {  TextInput, View, StyleSheet  } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Textarea extends Component {

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 0;

  scrollToBottom = () => {
    this.refs.scrollView.getScrollResponder().scrollResponderScrollTo({
      x: 0,
      y: (this.scrollHeight * 5),
      animated: true
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      filler: false,
      activo_teclado:"",
    };
  }

  handleClick =()=>{
    if (this.state.descripcion!='') {
      this.props.methods.send(this.state)
      this.setState({descripcion:""})
    }    
  }

  _keyboardDidShow() {
    this.setState({filler: true,activo_teclado:"Activo"})
    setTimeout(() => this.refs.scrollView.scrollToEnd({animated: true}), 200);
  }

  _keyboardDidHide() {
    this.setState({filler: false,activo_teclado:"Inactivo"})
  }

  render() {
    return (
        <View style={{flexDirection: 'row',}}>
            <TextInput ref="textarea"
              multiline
              numberOfLines={6}
              style={styles.inputs}
              onChangeText={(text)=>{this.setState({descripcion:text});}}
              placeholder="Comentario..."
              underlineColorAndroid='transparent'
              value={this.state.descripcion}
            />
            <Button
              buttonStyle={{backgroundColor:"#333",flex: 0.1, marginTop: 40, marginLeft: 5,}}
              onPress={()=>this.handleClick()}
              icon={
                <Icon
                  style={{padding: 5, }}
                  name="send"
                  size={15}
                  color="white"
                />
              }
            />

          { this.state.filler ? <View style={styles.filler}/> : null }
        </View>

    );
  }

}export default Textarea;

const styles = StyleSheet.create({
  filler:{
    height: 'Keyboard Height'
  },
  inputs:{
    height:90,
    marginLeft:16,
    borderColor: '#bbb',
    backgroundColor: "#fff",
    marginTop: 14,
    padding: 10,
    borderWidth: 2,
    borderRadius: 6,
    flex: 0.9,
  },
})
