import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const auth = FIREBASE_AUTH;
const AddPostScreen = () => {
  const [post, setPost] = useState(null);
  const db = FIREBASE_DB;
  const addPost = async (data) => {
    if (!post || post.trim() === "") {
      Alert.alert("Error", "You need to write something to post!");
      return;
    }
    await addDoc(collection(db, "posts"), {
      userID: auth.currentUser.uid,
      post: post,
      likes: "",
      imageUri :'',
      username : "user1",
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("Post: ", post);
        console.log("Document written with ID: ", addPost.id);
        Alert.alert(
          "Post published!",
          "Your post has been published Successfully!"
        );
        setPost(null);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputWrapper}>
        <TextInput
          style={styles.Input}
          placeholder="What's your mind?"
          multiline
          numberOfLines={5}
          value={post}
          onChangeText={(content) => setPost(content)}
        ></TextInput>
        <Button title="Add Post" onPress={addPost} />
      </View>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },

  InputWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
  },

  Input: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
    width: "90%",
    marginBottom: 15,
    justifyContent: "center",
    opacity: 0.7,
  },
  bouton: {
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "visible",
    backgroundColor: "#2e64e5",
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
});
