import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from "react";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, setDoc, getDocs, onSnapshot, query } from "firebase/firestore";

function Search() {

  const db = FIREBASE_DB;
  const [usernameData, setUserData] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "username"), (querySnapshot) => {
      const usernameData = [];
      querySnapshot.forEach((doc) => {
        usernameData.push({ id: doc.id, ...doc.data() });
      });
      setUserData(usernameData);
    });
    return () => {
      unsubscribe(); // Lorsque le composant est démonté, cela arrête la surveillance des modifications
    };
  }, [db]);


  return (
    <View style={styles.all}>
    <TextInput style={styles.input} placeholder='Search ...'></TextInput>
    <ScrollView>
        {usernameData.map((username) => (
          <View key={username.id} style={styles.headerContainer}>
              <View style={styles.userContainer}>
                <Image 
                  style={styles.image} 
                  source={{ uri: username.imageUri }} 
                />
                <Text style={styles.username}>{username.field}</Text>  
              </View>
          </View>
        ))}
      </ScrollView>
      </View>

  );
}

export default Search;

const styles = StyleSheet.create({
  all : {
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    // borderRadius: 10,
    // backgroundColor: 'white',
    // elevation: 3, // Pour l'ombre sur Android
    // shadowColor: '#000', // Pour l'ombre sur iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding : 10,
    margin: 20,
    position: 'relative',
    top: 0
},
  userContainer : {
    flexDirection: 'row',
    // justifyContent: 'space-between',

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F5F5DC",
  },
  username : {
    fontSize: 16,
    padding : 15,
  },
});
