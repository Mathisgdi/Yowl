import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
const storage = getStorage();

const Profile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  let user = auth.currentUser;

  const updateProfilePicture = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("voici l'image", pickedImage);
    console.log("voici l'uri de l'image ", pickedImage.assets[0].uri);
    await user.reload();
    console.log("voici user.photoURL",user.photoURL);

    if (!pickedImage.canceled) {
      setImage(pickedImage.assets[0].uri);
    }

    const response = await fetch(image);
    const blob = await response.blob();
    setShowProgress(true);
    const imageRef = ref(
      storage,
      `profileImages/${auth.currentUser.uid}/${Date.now()}` // Nom de l'image avec son chemin dans le storage
    );
    console.log("imageRef", imageRef); 

    const uploadTask = uploadBytesResumable(imageRef, blob); // Upload l'image

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
          addDoc(collection(db, "posts"), {
            userID: auth.currentUser.uid,
            imageUriProfile: downloadURL,
            username: getUsername(),
            timestamp: serverTimestamp(),
          })
          .then(() => {
            // Met à jour l'URL de la photo de profil de l'utilisateur
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            })
              .then(() => {
                setProgress(0); // Réinitialise la progression
                setShowProgress(false); // Cache la progression
                Alert.alert(
                  "Image uploaded!",
                  "Your profile picture has been updated successfully!"
                );
              })
              .catch((error) => {
                console.error("Error when updating user profile", error);
              });
          })
          .catch((error) => {
            console.error("Error when the post with image is added", error);
          });
      });
      }
    );
  };

  return (
    <View>
      <View>
        <View>
          <Button
            icon={<Icon name="settings-outline" size={30} />}
            buttonStyle={{
              backgroundColor: "transparent",
              padding: 10,
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("Settings")}
          />
          <Card.Title style={styles.text}>{getUsername()}</Card.Title>
          <View style={styles.headerContainer}>
            {image && image !== "" ? (
              <Image
                style={styles.image}
                source={{ uri: image }}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
              />
            )}
            <Text style={styles.followersText}> Followers: 1000 </Text>
            <Text style={styles.followersText}> Following: 500 </Text>
          </View>
          
          {showProgress && ( 
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
          )}
        </View>
        <Button
          title="Change profile picture"
          onPress={updateProfilePicture}
          buttonStyle={{
            marginTop: 50,
            width: 200,
            borderRadius: 10,
            alignItems: "center",
            alignSelf: "center",
          }}
        ></Button>
      </View>
    </View>
  );
};

export const getUsernameProfilePicture = async () => {
  const auth = FIREBASE_AUTH;
  let user = auth.currentUser;
  if (user) {
    await user.reload();
    return user.photoURL;
  } else {
    return "No user signed in";
  }
}

export const getUsername = () => {
  const auth = FIREBASE_AUTH;
  let user = auth.currentUser;
  if (user) {
    return user.displayName;
  } else {
    return "No user signed in";
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  followersText: {
    fontSize: 12,
  },
  text: {
    marginBottom: -15,
    fontSize: 24,
  },
  progressBarContainer: {
    height: 20,
    width: "50%",
    backgroundColor: "#f3f3f3",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: "25%",
    marginTop: 20,
  },
  progressBar: {
    height: "100%",
    width: "0%",
    backgroundColor: "#57A7FF",
    borderRadius: 5,
  },
});

export default Profile;
