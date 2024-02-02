import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from "react";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, setDoc, getDocs, onSnapshot, query } from "firebase/firestore";

const ShowData = () => {
  const db = FIREBASE_DB;
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPostData(postsData);
    });
    return () => {
      unsubscribe(); // Lorsque le composant est démonté, cela arrête la surveillance des modifications
    };
  }, [db]);

  return (
    <ScrollView>
      <View style={styles.background}>
        {postData.map((post) => (
          <View key={post.id} style={styles.headerContainer}>
            <View style={styles.userContainer}>
              <Image style={styles.image} source={{ uri: post.imageUri }} />
              <Text style={styles.username}>{post.username}</Text>
            </View>
            <View style={styles.post}>
              <Text style={styles.postText}>{post.post}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ShowData;

const styles = StyleSheet.create({
  headerContainer: {
    margin: 20,
    padding: 10,
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
  userContainer : {
    flexDirection: 'row',
    // justifyContent: 'space-between',

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "red",
    margin : 10,
  },
  username : {
    marginTop: 20,
    fontSize: 20,
  },
  post : {
    alignItems: 'center',
  },
  postText : {
    fontSize: 16,
    opacity: 0.7,
    padding: 10,
  },
  background: {
    backgroundColor: '#fff',
  },

});
