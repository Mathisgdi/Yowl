import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Image} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const SignIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
            console.log(response);
            alert('Connected');
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container} >

            <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            <Text style={styles.title}>Email</Text>
            <TextInput style={styles.input} placeholder=' example@mail.com' onChangeText={(text) => setEmail(text)}></TextInput>
            <Text style={styles.title}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder=' Enter your password' onChangeText={(text) => setPassword(text)}></TextInput>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.login} onPress={SignIn}>LOGIN</Text>
                    <Button title="Register here" onPress={() => navigation.navigate('Register')}></Button>
                </>
            )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    logo: {
        display: 'flex',
        alignSelf: 'center',
        margin: 20,
        width: 150,
        height: 150,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10
    },
    login: {
        textAlign: 'center',

    },
    title : {
        color: 'black',
        fontFamily: 'Mitr',
        fontSize: 18,
    },
});