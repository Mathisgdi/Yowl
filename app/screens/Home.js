import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';


function Home (){
  const navigation = useNavigation()
    return (
        <View>
          <Text>
            page home de fou furieux
          </Text>
      <Button 
      title='Go to login'
      onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default Home;
