import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Login from '.app/screens/Login';
import tw from 'twrnc';
=======
import { Text, View } from 'react-native';
>>>>>>> 059e4489e08067886fd3982a1ae47547dc0338f1

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
=======
    <View classname = "flex-1 justify-center items-center bg-red">
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Martin </Text>
    <Text style={`tw text-white text-3xl font-bold|f-Hello World`}> </Text>
      <StatusBar style="auto" />
    </View>
>>>>>>> 059e4489e08067886fd3982a1ae47547dc0338f1
  );
}

