import React, { useState, } from "react";
import {View, Image, StyleSheet, Alert, TouchableWithoutFeedback, Button, TextInput, Keyboard} from "react-native";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getUsername } from "./Profile";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
const storage = getStorage();

const AddPostScreen = () => {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Pour que le clavier descende quand on appuie en dehors de l'input
  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  // Récupère l'image de la galerie
  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("voici l'image", image);
    console.log("voici l'uri de l'image ", image.assets[0].uri);

    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  };

  // Ajoute un post dans la base de données
  const addPost = async (data) => {
    // Vérifie si le post est vide et si aucune image n'est sélectionnée
    if ((!post || post.trim() === "") && !image){
      Alert.alert("Error", "You need to write something or pick an image to post!");
      return;
    }
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      setShowProgress(true);
      // Crée une référence de l'image dans le storage de firebase
      const imageRef = ref(
        storage,
        `images/${auth.currentUser.uid}/${Date.now()}` // Nom de l'image avec son chemin dans le storage
      );
      const uploadTask = uploadBytesResumable(imageRef, blob); // Upload l'image
      // Met à jour la barre de progression
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log("Erreur lors de l'upload de l'image", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("URL de l'image: ", downloadURL);
            // Ajoute le post avec l'URL de l'image dans la base de données
            addDoc(collection(db, "posts"), {
              userID: auth.currentUser.uid,
              post: post,
              likes: "",
              imageUri: downloadURL,
              username: getUsername(),
              timestamp: serverTimestamp(),
            })
              .then(() => {
                setImage(null); // Efface l'image
                setProgress(0); // Réinitialise la progression
                setPost(null); // Efface le post
                setShowProgress(false); // Cache la progression
                Alert.alert(
                  "Post published!",
                  "Your post has been published Successfully!"
                );
              })
              .catch((error) => {
                console.error("Error when the post with image is added", error);
              });
          });
        }
      );
    } else {
      // Si aucune image n'est sélectionnée, on ajoute le post sans image
      await addDoc(collection(db, "posts"), {
        userID: auth.currentUser.uid,
        post: post,
        likes: "",
        imageUri: "",
        username: getUsername(),
        timestamp: serverTimestamp(),
      })
        .then(() => {
          setPost(null); // Efface le post
          Alert.alert(
            "Post published!",
            "Your post has been published Successfully!"
          );
        })
        .catch((error) => {
          console.error("Error when the post without image is added", error);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={styles.Container}>
        <View style={styles.inputWrapper}>
          {image && image !== "" ? (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
          ) : null}
          <TextInput
            style={styles.Input}
            placeholder="What's your mind?"
            multiline
            numberOfLines={5}
            value={post}
            onChangeText={(content) => setPost(content)}
          ></TextInput>
          {showProgress && ( // Affiche la barre de progression uniquement si showProgress est true
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
          )}

          <Button title="Add Post" onPress={addPost} />
        </View>
        <ActionButton buttonColor="#57A7FF">
          <ActionButton.Item
            buttonColor="#57A7FF"
            title="Take photo"
            onPress={() => console.log("notes tapped!")}
          >
            <Icon name="camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#57A7FF"
            title="Choose photo"
            onPress={pickImage}
          >
            <Icon name="images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  inputWrapper: {
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
  progressBarContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "#f3f3f3",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  progressBar: {
    height: "100%",
    width: "0%",
    backgroundColor: "#57A7FF",
    borderRadius: 5,
  },
});
