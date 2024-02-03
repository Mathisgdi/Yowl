import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';





const Profile = ({navigation}) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

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
              <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
              />
              <Text style={styles.followersText}> Followers: 1000 </Text>
              <Text style={styles.followersText}> Following: 500 </Text>
            </View>
          </View>
        </View>
      </View>
    );
};

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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
      marginBottom : - 15,
      fontSize : 24
    },
});




export default Profile;