import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import {Card} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
import Privacy from './Privacy';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import auth from "@react-native-firebase/auth";


const Settings = () => {

    const navigation = useNavigation();


    const onSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                navigation.navigate('Login');
            });
    };


    const [displayText, setDisplayText] = useState('');
    // const [email, setEmail] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleDataCollectedPress = () => {
        if (!buttonClicked) {
            setDisplayText('You have the right to request all the data we hold about you. If you wish to access this information, please enter your e-mail address below so that we can send it to you. The JOIN team');
            setShowTextInput(true);
            setButtonClicked(true);
        }
        else {
            setDisplayText('');
            setShowTextInput (false);
            setButtonClicked(false);
        }
        };



    return (
        <View>
            <Card>
                <Card.Divider/>
                <View>
                    <Button 
                        icon={
                            <Icon name="lock-closed-outline" size={30} />
                        }
                        title="Privacy Policy"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 20, alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                        onPress={() => navigation.navigate('Privacy')}                        
                    />


                    <Button 
                        icon={
                            <Icon name="list-outline" size={30} />
                        }
                        title="My data"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 20,  alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                        onPress={() => handleDataCollectedPress ()} 
                    />
                    <Text>{displayText}</Text>
                    {showTextInput && (
                    <TextInput style={styles.input} placeholder="exemple@mail.com" />
                    )}


                    <Button 
                        icon={
                            <Icons name="bell" size={30} />
                        }
                        title="Notifications"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 20,  alignSelf: 'flex-start', marginTop: -20}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                    /> 
                    <Button 
                        icon={
                            <Icon name="options-outline" size={30} />
                        }
                        title="Advanced Options"
                        buttonStyle={{ backgroundColor: 'transparent', padding: 20,  alignSelf: 'flex-start'}}
                        titleStyle={{ color: 'black', marginLeft: 20 }}
                    />                                                           
                    {/* <Button title='Se Déconnecter' onPress={() => navigation.navigate('Login')} /> */}
                    <Button title='Sign Out' onPress={() => onSignOut ()}                         
                    buttonStyle={{ backgroundColor: 'red', padding: 10}} />
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10
    },
    text: {
        color : 'black',
        marginLeft: 20,
    },
});




export default Settings;