import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Login from "./Login";
import Privacy from "./Privacy";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/Feather";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";

const auth = FIREBASE_AUTH;

const Settings = ({ navigation }) => {
  const Logout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [displayText, setDisplayText] = useState("");
  // const [email, setEmail] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleDataCollectedPress = () => {
    if (!buttonClicked) {
      setDisplayText(
        "You have the right to request all the data we hold about you. If you wish to access this information, please enter your e-mail address below so that we can send it to you. The JOIN team"
      );
      setShowTextInput(true);
      setButtonClicked(true);
    } else {
      setDisplayText("");
      setShowTextInput(false);
      setButtonClicked(false);
    }
  };

  return (
    <View>
      <View>
        <View>
          <Button
            icon={<Icon name="lock-closed-outline" size={30} />}
            title="Privacy Policy"
            buttonStyle={{
              backgroundColor: "transparent",
              padding: 20,
              alignSelf: "flex-start",
            }}
            titleStyle={{ color: "black", marginLeft: 20 }}
            onPress={() => navigation.navigate("Privacy")}
          />

          <Button
            icon={<Icon name="list-outline" size={30} />}
            title="My data"
            buttonStyle={{
              backgroundColor: "transparent",
              padding: 20,
              alignSelf: "flex-start",
            }}
            titleStyle={{ color: "black", marginLeft: 20 }}
            onPress={() => handleDataCollectedPress()}
          />
          <Text style={styles.text}>{displayText}</Text>
          {showTextInput && (
            <TextInput style={styles.input} placeholder="exemple@mail.com" />
          )}

          <Button
            icon={<Icons name="bell" size={30} />}
            title="Notifications"
            buttonStyle={{
              backgroundColor: "transparent",
              padding: 20,
              alignSelf: "flex-start",
              marginTop: -20,
            }}
            titleStyle={{ color: "black", marginLeft: 20 }}
          />
          <Button
            icon={<Icon name="options-outline" size={30} />}
            title="Advanced Options"
            buttonStyle={{
              backgroundColor: "transparent",
              padding: 20,
              alignSelf: "flex-start",
            }}
            titleStyle={{ color: "black", marginLeft: 20 }}
          />
        </View>
        <Button
          buttonStyle={{ margin: 30, borderRadius: 20, backgroundColor: "red" }}
          title="Logout"
          onPress={() => Logout()}
        />
      </View>
    </View>
  );
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    color: "black",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Settings;
