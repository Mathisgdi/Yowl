import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View classname = "flex-1 justify-center items-center bg-red">
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Martin </Text>
    <Text style={`tw text-white text-3xl font-bold|f-Hello World`}> </Text>
      <StatusBar style="auto" />
    </View>
  );
}

