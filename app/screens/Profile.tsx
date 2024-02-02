import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';






const Profile = ({navigation}) => {


    return (
        <View>
            <View>
                <View>
                    <Button
                        icon={
                            <Icon name="settings-outline" size={30} />
                        }
                        buttonStyle={{ backgroundColor: 'transparent', padding: 10, alignSelf: 'flex-end' }}
                        onPress={() => navigation.navigate('Settings')}
                    />
                    <View style={styles.headerContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/logo.png')}
                        />
                            <Text style={styles.followersText}> Followers: 1000 </Text>
                            <Text style={styles.followersText}> Following: 500 </Text>
                    </View>
                </View>
            </View>
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