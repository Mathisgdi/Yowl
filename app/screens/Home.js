import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

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
        {postData
          .sort((a, b) => b.timestamp - a.timestamp) // Triez les posts par ordre chronologique inverse
          .map((post) => (
            <View key={post.id} style={styles.headerContainer}>
              <View style={styles.userContainer}>
                <Image style={styles.imageProfile} />
                <Text style={styles.username}>{post.username}</Text>
              </View>
              {post.imageUri && (
                <Image
                  style={styles.imagePost}
                  source={{ uri: post.imageUri }}
                />
              )}
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
    borderBottomColor: "black",
  },
  userContainer: {
    flexDirection: "row",
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F5F5DC",
    margin: 10,
  },
  imagePost: {
    width: 300,
    height: 300,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#F5F5DC",
  },
  username: {
    marginTop: 20,
    fontSize: 20,
  },
  post: {
    alignItems: "center",
  },
  postText: {
    fontSize: 16,
    opacity: 0.7,
    padding: 10,
  },
  background: {
    backgroundColor: "#fff",
  },
});
