import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Image, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const Register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
    const [accept, setAccept] = useState(false);
    const [addData, setAddData] = useState('');

    const addField = async (text: string) => {
        await setDoc(doc(db, "username", text), {
            field: text
        });
    }

    const SignUp = async () => {
        setLoading(true);
        const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const good = regex_password.test(password);
        try {
            if (password === passwordCheck && good != true) {
                alert("Your password doesn't respect the rule of the strong password")
            }
            if (password != passwordCheck && good != true) {
                alert("Your password doesn't respect the rule of the strong password and passwords do not match")
            }
            if (password === passwordCheck && good == true) {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                addField(addData)
                alert('User created');
            }
            if (password != passwordCheck && good == true) {
                alert('Passwords do not match');
            }
        }
        catch (e) {
            console.log(e);
            alert('Incorrect email or password')
        } finally {
            setLoading(false);
        }
    }
    return (
        <ScrollView style={styles.container} >

            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={styles.title}>Username</Text>
            <TextInput style={styles.input} placeholder=' Username'  onChangeText={(addData) => setAddData(addData)}></TextInput>
            <Text style={styles.title}>Email</Text>
            <TextInput style={styles.input} placeholder=' example@mail.com' onChangeText={(email) => setEmail(email)}></TextInput>
            <Text style={styles.title}>Password</Text>
            <Text style={styles.text}>At least: 8 characters including 1 capital letter, 1 special character and a number</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder=' Enter your password' onChangeText={(password) => setPassword(password)}></TextInput>
            <Text style={styles.title}>Verify your password</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder=' Verify your password' onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}></TextInput>
            <View style={styles.checkbox}>
            <CheckBox checked={accept} onPress={() => setAccept(!accept)} />
            <Button title="Accept the CGU" onPress={() => navigation.navigate('CGU')}></Button>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Button title="REGISTER" onPress={SignUp}></Button>
                </>
            )}
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
        color: 'red'
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
    title : {
        color: 'black',
        fontFamily: 'Mitr',
        fontSize: 18,
    },
});