import React, { Component } from 'react';
import { View , TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import base64 from 'base64-js'
import { Button } from 'react-native-elements';
import { Upload,Convertir_base64 }  from '../../helpers/Functions';

class Attachment extends Component {
  constructor(props) {
    super(props);
  }

  pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type!=="cancel") {
      try{
        Convertir_base64(result).then(v => {
          this.props.Object.setState({"singleFile":v,result_singleFile:result})
        })
      }catch(e){
        this.props.setState({"singleFile":"Error Convertir base64"})
        console.log("Error Convertir base64");
      }
    }else{
      console.log(result.type);
    }
  }

  render() {
    let props  = this.props.props;
    return (
      <TouchableOpacity >
        <View>
          <Button onPress={this.pickDocument}
                  icon={
                        <Icon
                          name="cloud-upload"
                          size={15}
                          color="white"
                          style={{marginRight:10}}
                        />
                  }
                  title="Subir Archivo Material de apoyo"
          />
        </View>
      </TouchableOpacity>
    )
  }

}
export default Attachment;
