import { Text, View } from 'react-native';
import React, {  useState, useEffect } from 'react';
import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, setDoc, getDocs } from "firebase/firestore";

const ShowData = () => {
  const db = FIREBASE_DB;
  const [postData, setPostData] = useState([]); 
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPostData(postsData); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); // Execute la fonction que une fois

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

