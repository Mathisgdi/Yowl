import { Text, View } from "react-native";
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
    <View>
      {postData.map((post) => (
        <View key={post.id}>
          <Text>{post.post}</Text>
          <Text>----------------------------------------</Text>
        </View>
      ))}
    </View>
  );
};

export default ShowData;
