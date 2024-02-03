import React, { useState, useContex, useEffect } from "react";
import { View, Text,Image,Platform, StyleSheet, Alert, TouchableWithoutFeedback, Button, TextInput, Keyboard } from "react-native";
import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { getUsername } from './Profile';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, downloadURL } from "firebase/storage";
// import storage from '@react-native-firebase/storage';


const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
const storage = getStorage();
const AddPostScreen = () => {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(null);
  // Pour que le clavier descende quand on appuie en dehors de l'input
  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  // const storageRef = ref(storage, 'posts/mountains.jpg');
  
  // uploadBytes(storageRef, result).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
  
  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(image);
    // console.log(image.uri);
    console.log(image.assets[0].uri);
    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  };

  const addPost = async (data) => {
    if (!post || post.trim() === "") {
      Alert.alert("Error", "You need to write something to post!");
      return;
    }

    if (image) {
      const imageRef = ref(storage, `images/${auth.currentUser.uid}/${Date.now()}`);
      const response = await uploadBytesResumable(imageRef, image, {
        contentType: 'image/jpeg', // Vous pouvez ajuster le type de contenu en fonction du type d'image que vous utilisez
      });
      console.log("Image uploaded!", response);

      const URLimage = await downloadURL
      

      // Ajoutez l'URI de l'image dans la base de données
      await addDoc(collection(db, "posts"), {
        userID: auth.currentUser.uid,
        post: post,
        likes: "",
        imageUri: URLimage, // Ajoutez l'URI de l'image ici
        username: getUsername(),
        timestamp: serverTimestamp(),
      });
    } else {
      // Si aucune image n'est sélectionnée, ajoutez le post sans image




    await addDoc(collection(db, "posts"), {
      userID: auth.currentUser.uid,
      post: post,
      likes: "",
      imageUri :"",
      username : getUsername(),
      timestamp: serverTimestamp(),
    })
      // .then(() => {
      //   console.log("Post: ", post);
      //   console.log("Document written with ID: ", addPost.id);
      //   Alert.alert(
      //     "Post published!",
      //     "Your post has been published Successfully!"
      //   );
      //   setPost(null);
      // })
      // .catch((error) => {
      //   console.error("Error writing document: ", error);
      // });
  };
  setImage(null);
  setPost(null);
  Alert.alert(
    "Post published!",
    "Your post has been published Successfully!"
  );
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
    <View style={styles.container}>
      <View style={styles.InputWrapper}>
      {image != null ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : null}
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
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      <ActionButton buttonColor="#57A7FF">
          <ActionButton.Item buttonColor='#57A7FF' title="Take photo" onPress={() => console.log("notes tapped!")}>
            <Icon name="camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#57A7FF' title="Choose photo" onPress={pickImage}>
            <Icon name="images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    </View>
    </TouchableWithoutFeedback>
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
    color: 'white',
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

