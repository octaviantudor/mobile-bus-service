import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {StackScreenProps} from '@react-navigation/stack';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import styled from "styled-components/native";
import generatePushNotificationsToken from "../utils/generatePushNotificationsToken";

const auth = getAuth();
const firestore = getFirestore();
const Space = styled.View`
  width: 100%;
  height: 8px;
`

const SignUpScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        username: '',
        age: '',
        phone: '',
        error: ''
    })

    async function signUp() {
        const token= await generatePushNotificationsToken();
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }


        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            let idUser = auth.currentUser?.uid;
            if (idUser === undefined) {
                idUser = "";
            }

            await setDoc(doc(firestore, "users", idUser), {
                phone: value.phone,
                username: value.username,
                age: value.age,
                token: token
            });
            navigation.navigate('Sign In');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.signUpText}>SIGN UP Screen</Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
            <Space/>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={value.email}
                    onChangeText={(text) => setValue({...value, email: text})}
                    style={styles.input}
                />
                <Space/>
                <TextInput
                    placeholder='Password'
                    value={value.password}
                    onChangeText={(text) => setValue({...value, password: text})}
                    secureTextEntry={true}
                    style={styles.input}

                />
                <Space/>
                <TextInput
                    placeholder='Username'
                    value={value.username}
                    onChangeText={(text) => setValue({...value, username: text})}
                    style={styles.input}
                />
                <Space/>
                <TextInput
                    placeholder='Phone'
                    value={value.phone}
                    onChangeText={(text) => setValue({...value, phone: text})}
                    style={styles.input}
                />
                <Space/>
                <TextInput
                    placeholder='Age'
                    value={value.age}
                    onChangeText={(text) => setValue({...value, age: text})}
                    style={styles.input}

                />
                <Space/>

                <Button title="Sign up" buttonStyle={styles.control} onPress={signUp}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    signUpText:{
        fontSize: 32,
        color: 'white',
    },
    inputContainer: {
        width: '80%',
        paddingTop: 40
    },

    container: {
        flex: 1,
        paddingTop: 20,
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },

    control: {
        backgroundColor: 'green',
        marginTop: 10
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    }
});

export default SignUpScreen;