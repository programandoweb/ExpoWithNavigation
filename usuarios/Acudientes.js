import React, { Component } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';
import { Avatar } from 'react-native-elements';
import {Colors,Sizes} from '../constants/';
import {ComponentTareas,WDetallesTareas,WDetallesTarea,WTareasDeMiHijo,WDetallesTareasEvaluation} from '../components/tareas/';
import {ComponentNoticias} from '../components/noticias/';
import {ComponentProfesores,WDetallesProfesores} from '../components/profesores/';
import {ComponentNotas,WDetallesNotas} from '../components/notas/';
import {ComponentMicuenta} from '../components/micuenta/';

let methods,localMethods     = {};
let wDetalle = ""

function Noticias({ navigation }) {
  return (<ComponentNoticias methods={methods} localMethods={localMethods} navigation={navigation}/>);
}

function TareasScreen({ navigation }) {
  return (<ComponentTareas methods={methods} localMethods={localMethods} navigation={navigation}/>);
}

function Profesores({ navigation }) {
  return (<ComponentProfesores methods={methods} localMethods={localMethods} navigation={navigation}/>);
}

function Notas({ navigation }) {
  return (<ComponentNotas methods={methods} localMethods={localMethods} navigation={navigation}/>);
}

function Micuenta({ navigation }) {
  return (<ComponentMicuenta methods={methods} localMethods={localMethods} navigation={navigation}/>);
}


function ScreenDetallesTareas({ navigation }) {
  return (<WDetallesTareas  methods={methods} localMethods={localMethods} navigation={navigation}/> );
}

function ScreenTareasEvaluation({ navigation }) {
  return (<WDetallesTareasEvaluation  methods={methods} localMethods={localMethods} navigation={navigation}/> );
}

function ScreenDetallesTarea({ navigation }) {
  return (<WDetallesTarea  methods={methods} localMethods={localMethods} navigation={navigation} /> );
}

function ScreenTareasDeMiHijo({ navigation }) {
  return (<WTareasDeMiHijo  methods={methods} localMethods={localMethods} navigation={navigation} /> );
}

function ScreenDetallesAlumnos({ navigation }) {
  return (<WDetallesAlumno  methods={methods} localMethods={localMethods} navigation={navigation}/> );
}

function ScreenDetallesAlumno({ navigation }) {
  return (<View/> );
}

function ScreenDetallesNotas({ navigation }) {
  return (<WDetallesNotas  methods={methods} localMethods={localMethods} navigation={navigation}/> );
}

function ScreenDetallesProfesores({ navigation }) {
  return (<WDetallesProfesores  methods={methods} localMethods={localMethods} navigation={navigation}/> );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let BgColor;
          let IcoColor;
          if (route.name === 'Tareas') {
            iconName = focused ? 'book' : 'book';
            BgColor = "#fff"
            IcoColor = Colors.screenPrimary
          } else if (route.name === 'Notas') {
            iconName = focused ? 'address-book' : 'address-book';
            BgColor = "#fff"
            IcoColor = Colors.screenPrimary
          } else if (route.name === 'Profesores') {
            iconName = focused ? 'users' : 'users';
            BgColor = "#fff"
            IcoColor = Colors.screenPrimary
          } else if (route.name === 'Cuenta') {
            iconName = focused ? 'user' : 'user';
            BgColor = "#fff"
            IcoColor = Colors.screenPrimary
          } else if (route.name === 'Noticias') {
            iconName = focused ? 'newspaper-o' : 'newspaper-o';
            BgColor = "#fff"
            IcoColor = Colors.screenPrimary
          }
          // You can return any component that you like here!
          return <Avatar
            rounded
            size="small"
            icon={{color: Colors.iconPrimary, name: iconName, type: 'font-awesome'}}
            overlayContainerStyle={{backgroundColor:BgColor , borderWidth: 1, borderColor: IcoColor,}}
            activeOpacity={0.7}
          />
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.textPrimary,
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14,
          marginBottom:10,
        },
        style: {
          height:75,
          paddingTop:5,
        },
      }}
      >
      <Tab.Screen name="Tareas" component={TareasScreen}/>
      <Tab.Screen name="Notas" component={Notas} />
      <Tab.Screen name="Profesores" component={Profesores} />
      <Tab.Screen name="Mi Cuenta" component={Micuenta} />
    </Tab.Navigator>
  );
}

const MainStack = createStackNavigator();
const Details   = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="Home"
                    component={ HomeTabs  }
                    options={{  headerTintColor: 'white',
                                headerStyle: { backgroundColor: Colors.screenPrimary },}}
      />
    </MainStack.Navigator>
  );
}

function FDetallesTareas({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenDetallesTareas}
      />
    </MainStack.Navigator>
  );
}

function FTareasEvaluation({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenTareasEvaluation}
      />
    </MainStack.Navigator>
  );
}

function FDetallesTarea({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenDetallesTarea}
      />
    </MainStack.Navigator>
  );
}

function FTareasDeMiHijo({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenTareasDeMiHijo}
      />
    </MainStack.Navigator>
  );
}

function FDetallesAlumnos({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenDetallesAlumnos}
      />
    </MainStack.Navigator>
  );
}

function FDetallesAlumno({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenDetallesAlumnos}
      />
    </MainStack.Navigator>
  );
}

function FDetallesNotas({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenDetallesNotas}
      />
    </MainStack.Navigator>
  );
}

function FDetallesProfesores({ navigation }) {
  return (
    <MainStack.Navigator
      headerMode="none"
      headerTitleAlign="center"
      headerBackTitleVisible="true">
      <MainStack.Screen
          name="Details"
          component={ScreenDetallesProfesores}
      />
    </MainStack.Navigator>
  );
}

class App extends Component {

  constructor (args) {
    super(args)
    this.state = {
      headerMode:this.props.methods.state.headerMode,
      headerTitle:"",
      backgroundColor:"#ffffff",
      cardStyle:"#fff",
    };
  }

  updateState=(data)=>{
    this.setState(data)
  }

  render(){
    methods = this.props.methods;
    localMethods = this;
    return(<NavigationContainer>
              <RootStack.Navigator  mode="modal" >
                <RootStack.Screen
                                  name="Main"
                                  component={MainStackScreen}
                                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                                  name="DetallesTareas"
                                  component={FDetallesTareas}
                                  options={{  headerShown: true,
                                              headerTitle:this.state.headerTitle,
                                              headerTitleStyle:{color:"#fff"},
                                              headerStyle:{backgroundColor:this.state.backgroundColor,},
                                              leftButtonStyle:{color:"#333", backgroundColor:"#f1f1f1"}
                                           }} />
               <RootStack.Screen
                                 name="DetallesTarea"
                                 component={FDetallesTarea}
                                 options={{  headerShown: true,
                                             headerTitle:this.state.headerTitle,
                                             headerTitleStyle:{color:"#fff"},
                                             headerStyle:{backgroundColor:this.state.backgroundColor,},
                                             leftButtonStyle:{color:"#333", backgroundColor:"#f1f1f1"}
                                          }} />
              <RootStack.Screen
                                name="TareasEvaluation"
                                component={FTareasEvaluation}
                                options={{  headerShown: true,
                                            headerTitle:this.state.headerTitle,
                                            headerTitleStyle:{color:"#fff"},
                                            headerStyle:{backgroundColor:this.state.backgroundColor,},
                                            leftButtonStyle:{color:"#333", backgroundColor:"#f1f1f1"}
                                         }} />
              <RootStack.Screen
                                name="TareasDeMiHijo"
                                component={FTareasDeMiHijo}
                                options={{  headerShown: true,
                                            headerTitle:this.state.headerTitle,
                                            headerTitleStyle:{color:"#fff"},
                                            headerStyle:{backgroundColor:this.state.backgroundColor,},
                                            leftButtonStyle:{color:"#333", backgroundColor:"#f1f1f1"}
                                         }} />
               <RootStack.Screen
                                 name="DetallesAlumnos"
                                 component={FDetallesAlumnos}
                                 options={{  headerShown: true,
                                             headerTitle:this.state.headerTitle,
                                             headerTitleStyle:{color:"#fff"},
                                             headerStyle:{backgroundColor:this.state.backgroundColor,},
                                             leftButtonStyle:{color:"#fff", backgroundColor:"#f1f1f1"}
                                          }} />
              <RootStack.Screen
                                name="DetallesAlumno"
                                component={FDetallesAlumno}
                                options={{  headerShown: true,
                                            headerTitle:this.state.headerTitle,
                                            headerTitleStyle:{color:"#fff"},
                                            headerStyle:{backgroundColor:this.state.backgroundColor,},
                                            leftButtonStyle:{color:"#fff", backgroundColor:"#f1f1f1"}
                                         }} />
              <RootStack.Screen
                                name="DetallesNotas"
                                component={FDetallesNotas}
                                options={{  headerShown: true,
                                            headerTitle:this.state.headerTitle,
                                            headerTitleStyle:{color:"#fff"},
                                            headerStyle:{backgroundColor:this.state.backgroundColor,},
                                            leftButtonStyle:{color:"#fff", backgroundColor:"#f1f1f1"}
                                         }} />
               <RootStack.Screen
                                 name="DetallesProfesores"
                                 component={FDetallesProfesores}
                                 options={{  headerShown: true,
                                             headerTitle:this.state.headerTitle,
                                             headerTitleStyle:{color:"#fff"},
                                             headerStyle:{backgroundColor:this.state.backgroundColor,},
                                             leftButtonStyle:{color:"#fff", backgroundColor:"#f1f1f1"}
                                          }} />
              </RootStack.Navigator>
            </NavigationContainer>)
  }

}

export default App;
