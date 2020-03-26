import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';

function TareasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function ProfileScreen() {
  return <View />;
}

function AccountScreen() {
  return <View />;
}

function SettingsScreen() {
  return <View></View>;
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tareas" component={TareasScreen}/>
      <Tab.Screen name="Alumnos" component={ProfileScreen} />
      <Tab.Screen name="Asistencia" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerTintColor: 'white',headerStyle: { backgroundColor: 'tomato' },}}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Jorge" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
