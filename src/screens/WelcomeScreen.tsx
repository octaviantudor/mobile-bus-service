import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {StatusBar} from "expo-status-bar";
import {StackScreenProps} from "@react-navigation/stack";
import CustomButton from "../components/CustomButton";
import styled from "styled-components/native";
import * as Facebook from 'expo-facebook';
import {getAuth, FacebookAuthProvider, signInWithCredential} from "firebase/auth";


const Space = styled.View`
  width: 100%;
  height: 8px;
`

const auth = getAuth();

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const appId = '487284473084548';
    async function signInWithFacebook() {
        await Facebook.initializeAsync({
            appId: appId
        });
        try {
            const {
                type,
                token
            } =await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile','email']
            });
            console.log();
            if (type === 'success') {
                let credential=FacebookAuthProvider.credential(token);
                await signInWithCredential(auth, credential);
            }
        } catch (mesaj) {
            console.log(mesaj)
            return mesaj;
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome Screen</Text>
            <StatusBar style={"auto"}/>
            <View style={styles.buttonContainer}>
                <CustomButton label={'Sign in'} onPress={() => navigation.navigate('Sign In')} width={200}/>
                <Space/>
                <CustomButton label={'Sign up'} onPress={() => navigation.navigate('Sign Up')} width={200}/>
                <Space/>
                <CustomButton label={'Login with Facebook'} onPress={signInWithFacebook} width={200}/>
            </View>


        </View>


    )
}

const styles = StyleSheet.create({
    welcomeText:{
        fontSize: 32,
        color: 'white',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
});

export default WelcomeScreen;