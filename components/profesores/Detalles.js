  import React, { Component } from 'react';
import { View, Text, ScrollView ,TouchableOpacity,Button,KeyboardAvoidingView  } from 'react-native';
import {Colors,Sizes,Styles} from '../../constants/';
import { Avatar } from 'react-native-elements';
import Config from '../../constants/Config';
import Chat from '../chat/';
import UserProvider from '../../contextUser';

class App extends Component {

  static contextType  = UserProvider

  constructor (args) {
    super(args)
    this.state = {
      id: "",
    }
  }

  currHeight = 0;
  prevHeight = 0;
  scrollHeight = 1;

  componentDidMount() {
    
  }

  scrollToBottom = () => {
    this.refs.scrollView.scrollToEnd({animated: true})
  };

  render() {
    return (  <KeyboardAvoidingView
                style={{paddingBottom: 100, flex: 1,}}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}
              >
                <ScrollView ref="scrollView">
                  <Chat id={this.props.localMethods.state.data.profesor_id+'::'+this.props.localMethods.state.data.profesor_token+'::'+this.context.token} scrollToBottom={this.scrollToBottom}  methods={this.props.methods}/>
                </ScrollView>
              </KeyboardAvoidingView>
          )
  }
}
export default App;
