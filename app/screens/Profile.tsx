import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
} from 'react-native';
import {Card, ListItem, Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';





const Profile = () => {

    const navigation = useNavigation();


//     const onSignOut = () => {
//         auth()
//             .signOut()
//             .then(() => {
//                 console.log('User signed out!');
//                 props.navigation.navigate('Login');
//             });
//     };


    return (
        <View>
            <Card>
                <Card.Divider/>
                <View>
                    <View style={styles.headerContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/logo.png')}
                        />
                            <Text style={styles.followersText}> Followers: 1000 </Text>
                            <Text style={styles.followersText}> Following: 500 </Text>
                    </View>
                    <Card.Title> User.name </Card.Title>
                    <Button title='Se Déconnecter' onPress={() => navigation.navigate('Login')} />
                </View>
            </Card>
        </View>
    );
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
});




export default Profile;