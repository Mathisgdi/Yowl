import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
// import tailwind from 'tailwind-rn';

// import { create } from 'tailwind-rn';

// const {tailwind, getColor} = create(styles);

function Home (){
  const navigation = useNavigation()
    return (
        <View>
          <Text>
            page home de fou furieux
          </Text>
      <Button 
      title='Go to login'
      onPress={() => navigation.navigate('Login')} 
      />
      {/* <TouchableOpacity 
  style={tailwind('bg-blue-500 p-2 rounded')}
  onPress={() => navigation.navigate('Login')}
>
  <Text style={tailwind('text-white text-center')}>Go to login</Text>
</TouchableOpacity> */}
        </View>
    )
}

export default Home;

// import { create } from 'tailwind-rn';
// import {useTailwind} from 'tailwind-rn';
// // import styles from './styles.json';
// import { useNavigation } from '@react-navigation/native';
// const {tailwind} = create(styles);

// function Home (){
//   const navigation = useNavigation()
//     return (
//         <View style={tailwind('p-4')}>
//           <Text style={tailwind('text-xl font-bold')}>
//             page home de fou furieux
//           </Text>
//           <TouchableOpacity 
//             style={tailwind('bg-blue-500 p-2 rounded')}
//             onPress={() => navigation.navigate('Login')}
//           >
//             <Text style={tailwind('text-white text-center')}>Go to login</Text>
//           </TouchableOpacity>
//         </View>
//     )
// }

// export default Home;