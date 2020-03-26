import * as FileSystem from 'expo-file-system';
import Config from '../constants/Config';
import Storage from './Storage';
import socketIO from 'socket.io-client';

const socket = socketIO(Config.socket, {
        transports: ['websocket'],
        jsonp: false,
        rejectUnauthorized: false,
      });
      socket.connect();

      socket.on('connect', () => {
        console.log("Conectado a Colombia...");
      });
      socket.on('connect_failed', () => {
        console.log("No Conectado a Colombia...");
      });


const CutString=(text,wordsToCut)=>{
      if (wordsToCut==undefined) {
        wordsToCut = 20;
      }
      var wordsArray = text.split(" ");
      if(wordsArray.length>wordsToCut){
          var strShort = "";
          for(i = 0; i < wordsToCut; i++){
              strShort += wordsArray[i] + " ";
          }
          return strShort+"...";
      }else{
          return text;
      }
  };

const Back = (Object)  =>{
  let array_navigation  = Object.state.navigation
  let anterior  = parseInt(array_navigation.length) - 1;
  let back      = array_navigation[anterior];
  let new_array = []

  array_navigation.map((v,k) => {
    if (k!=anterior) {
      new_array =  [...new_array,v]
    }
  })

  if(Object.methods!=undefined){
    //console.log(new_array,array_navigation,back,Object.methods.sobre_escribir_el_estado);
    Object.methods.sobre_escribir_el_estado({navigation:new_array,screen:back});
  }else if (Object.sobre_escribir_el_estado!=undefined){
    Object.sobre_escribir_el_estado({navigation:new_array,screen:back});
  }
}

const Array_search =  (array,search,Object)  =>  {
  return new Promise(resolve => {
    let new_array = []
    let bool      = "NO";
    array.map((v,k) => {
      if (v==search) {
        bool  = "SI"
      }
    })
    if (bool=="NO") {
      new_array =  [...Object.state.navigation,search]
      Object.methods.sobre_escribir_el_estado({navigation:new_array})
    }
    //console.log(array,search);
    //resolve(base64)
  });
}

const Add_Evaluaciones =  ( Object ) => {
  var   headers =   new Headers();
  var   data    =   new FormData();
  if (Object.state.result_singleFile.uri!=undefined) {
        let   uri       =   Object.state.result_singleFile.uri
        let   uriParts  =   uri.split('.');
        let   fileType  =   uriParts[uriParts.length - 1];
        data.append('archivo_base64', Object.state.singleFile );
        data.append('archivo_datos', JSON.stringify(Object.state.result_singleFile) );
        data.append('archivo_ext', fileType );
        //console.log(fileType);        return;
      }
        if( Object.state.evaluacion==''
            ||  Object.state.materia==''
            ||  Object.state.periodo==''
            ||  Object.state.descripcion==''){
            let obj = {
                        isVisible:true,
                        title:"Atención",
                        messages:"Debes completar los datos para continuar...",
                        height: "auto",
                      }
                Object.props.methods.sobre_escribir_el_estado({modal:obj})
            return false;
        }
        data.append('evaluacion', Object.state.evaluacion );
        data.append('materia_token', Object.state.materia );
        data.append('periodo', Object.state.periodo );
        data.append('token', Object.state.token );
        data.append('descripcion', Object.state.descripcion );
        data.append('fecha', Object.state.fecha );
  let   cabecera  =   { headers: {
                        'Accept': 'application/json',
                      },
                      method: "POST",
                      body: data
                    }
  fetch(Config.ApiRest + "post?modulo=Profesores&m=APP_AddEvaluacion&formato=json&u="+Object.state.user,cabecera)
    .then(response => response.json())
    .then(data => Object.recargar_tareas(data))
}

const FechaHoy = ()  =>{
  /*FECHA DE HOY*/
  let date    =   new Date( );
  let day     =   date.getDate();
      if (day < 10) {
        day = "0"+day;
      }
  let month  =  date.getUTCMonth();
      if (month < 10) {
        month  =  month+1;
        month  =  "0"+month;
      }else {
        month  =  month+1;
      }

  let year   =  date.getUTCFullYear();
  let newDate = year+"-"+month+"-"+day;
  return newDate;
}

const Convertir_base64 = (result)  =>{
  return new Promise(resolve => {
    let base64;
    base64 =  FileSystem.readAsStringAsync(  result.uri,{encoding: FileSystem.EncodingType.Base64,});
    resolve(base64)
  });
}

const setState = (data,methods) =>{
  //Storage.St.set("extraData",data.response,methods);
  //console.log(Storage.St.set);
  methods.sobre_escribir_el_estado(data.response);
}


const get = (user,methods,component,id) =>{
  methods.setState({loading:true})
  var me      =   user;
  var headers =   new Headers();
  var data    =   new FormData();
      data.append ("u", me.token);
      data.append ("token", me.token);
  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }

  fetch(Config.ApiRest + "get?modulo=Profesores&m=getInfo&component="+component+"&id="+id+"&formato=json&u="+me.token,cabecera)
    .then(response => response.json())
    .then(data => { procesarGet(methods,component,id,data)})
    .catch((error) => { console.log(error)  });
}

const procesarGet=(local_methods,component,id,data)=>{
  if (data.response.callBack!=undefined) {
    socket.emit('enviar_actualizacion',data.response);
  }else {
    socket.emit('enviar_actualizacion',data.response);
  }
  local_methods.setState({loading:false})
}

const getInfo = (methods,local_methods,component,id) =>{
  var me      =   methods.state.user;
  var headers =   new Headers();
  var data    =   new FormData();
      data.append ("u", me.token);
      data.append ("token", me.token);
  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }

  fetch(Config.ApiRest + "get?modulo=Profesores&m=getInfo&component="+component+"&id="+id+"&formato=json&u="+me.token,cabecera)
    .then(response => response.json())
    .then(data =>     { if (component!="ListaTareasDeMiHijo") { procesarGetInfo(methods,local_methods,component,data,id) }else{ console.log("Se llamo elfech") }} )
    .catch((error) => { console.log(error)  });
}


const procesarGetInfo=(methods,local_methods,component,data,id)=>{
  //console.log("Llamo al Socket procesarGetInfo")
  if (data.response.callBack!=undefined) {
    socket.emit('enviar_actualizacion',data.response);
    socket.on('actualizacion', (respuestaSocket)=>{
      //console.log(respuestaSocket,"Respuesta Socket 1")
      local_methods[data.response.callBack](respuestaSocket)
    });
  }else {
    socket.emit('enviar_actualizacion',data.response);
    socket.on('actualizacion', (respuestaSocket)=>{
      //console.log(respuestaSocket,"Respuesta Socket 2 " +component)
      local_methods.setState(respuestaSocket)
    });
  }

}

const getRecargaDatos = (methods,local_methods,component,id) =>{
  socket.on('recarga_datos', ()=>{
    console.log("getInfo Llamado desde Sokect");
    getInfo(methods,local_methods,component,id,true)
  });
}


const getInfoGenerico = (modulo,m,methods,local_methods,component,id) =>{
  var me      =   methods.state.user;
  var headers =   new Headers();
  var data    =   new FormData();
      data.append ("u", me.token);
      data.append ("token", me.token);
  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }

  fetch(Config.ApiRest + "get?modulo="+modulo+"&m="+m+"&component="+component+"&id="+id+"&formato=json&u="+me.token,cabecera)
    .then(response => response.json())
    .then(data =>     { local_methods.setState(data.response); local_methods.setState({loading:false}) } )
    .catch((error) => { console.log(error)  });
}

const postGenerico    = (modulo,m,methods,local_methods,component,objeto) =>{
  var me      =   methods.state.user;
  var headers =   new Headers();
  var data    =   new FormData();
      Object.entries(objeto).map((v,k) => {
        data.append (v[0],v[1]);
      })
      data.append ("u", me.token);
      data.append ("token", me.token);

  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }

  fetch(Config.ApiRest + "get?modulo="+modulo+"&m="+m+"&component="+component+"&formato=json&u="+me.token,cabecera)
    .then(response => response.json())
    .then(data =>     { procesarResponseGenerico(local_methods,component,data) } )
    .catch((error) => { console.log(error)  });
}

const procesarResponseGenerico=(local_methods,component,data)=>{
  const socket = socketIO(Config.socket, {
          transports: ['websocket'],
          jsonp: false,
          rejectUnauthorized: false,
        });
        socket.connect();
        socket.on('connect', () => {
          //console.log("Conectado Socket en procesarResponseGenerico");
        });
  /*TODO FUE MODIFICADO PARA QUE NO SE ME FUESE INCREMENTANDO EL EVENTO*/
  if (data.response.callBack!=undefined) {
    local_methods[data.response.callBack](data.response)
  }else {
    socket.emit('enviar_mensaje_a_todos',data.response);
  }
  local_methods.setState({loading:false})
}

const post    = (methods,local_methods,component,objeto) =>{
  var me      =   methods.state.user;
  var headers =   new Headers();
  var data    =   new FormData();
      Object.entries(objeto).map((v,k) => {
        data.append (v[0],v[1]);
      })
      data.append ("u", me.token);
      data.append ("token", me.token);
  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }

  fetch(Config.ApiRest + "get?modulo=Profesores&m=setInfo&component="+component+"&formato=json&u="+me.token,cabecera)
    .then(response => response.json())
    .then(data =>     { procesarResponse(local_methods,component,data); local_methods.setState({loading_btn:false});} )
    .catch((error) => { console.log(error)  });
}

const procesarResponse=(local_methods,component,data)=>{
  const socket = socketIO(Config.socket, {
          transports: ['websocket'],
          jsonp: false,
          rejectUnauthorized: false,
        });
        socket.connect();
        socket.on('connect', () => {
          console.log("Conectado Socket en procesarResponseGenerico");
        });

  socket.emit('enviar_actualizacion',data.response);
  // socket.on('actualizacion', (respuestaSocket)=>{
  //   console.log(respuestaSocket,"Respuesta Socket 2")
  //   local_methods.setState(respuestaSocket)
  // });
  //local_methods.setState(data.response)

}

export default {  Add_Evaluaciones,
                  Convertir_base64,
                  FechaHoy,
                  Array_search,
                  Back,
                  setState,
                  getInfo,
                  post,
                  getInfoGenerico,
                  postGenerico,
                  FechaHoy,
                  CutString,
                  getRecargaDatos,
                  get,
                  socket}
