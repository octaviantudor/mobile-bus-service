import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth();


const LoginScreen = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Sign in screen!</Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={value.email}
                    onChangeText={(text) => setValue({...value, email: text})}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Password'
                    value={value.password}
                    onChangeText={(text) => setValue({...value, password: text})}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <Button title="Sign in" buttonStyle={styles.control} onPress={signIn}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loginText:{
        fontSize: 32,
        color: 'black',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundImage: "blue",
        alignItems: 'center',
        justifyContent: 'center',
    },


    inputContainer: {
        width: '60%',
        paddingTop: 40
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

export default LoginScreen;