import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
import Privacy from './Privacy';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Fontisto';


const Settings = () => {

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
                {/* <Ionicons name="settings-outline" size = {30} /> */}
                    <Button 
                        icon={
                            <Icon name="lock-closed-outline" size={30} />
                        }
                        title="Privacy Policy"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 10, alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                        onPress={() => navigation.navigate('Privacy')}                        
                    />
                    <Button 
                        icon={
                            <Icon name="list-outline" size={30} />
                        }
                        title="My data"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 10,  alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                    />
                    <Button 
                        icon={
                            <Icons name="bell" size={30} />
                        }
                        title="Notifications"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 10,  alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                    /> 
                    <Button 
                        icon={
                            <Icon name="options-outline" size={30} />
                        }
                        title="Advanced Options"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 10,  alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                    />                                                           
                    {/* <View style={styles.headerContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/logo.png')}
                        />
                            <Text style={styles.followersText}> Followers: 1000 </Text>
                            <Text style={styles.followersText}> Following: 500 </Text>
                    </View>
                    <Card.Title> User.name </Card.Title> */}
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




export default Settings;