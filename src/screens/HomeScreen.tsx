import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuthentication} from '../utils/hooks/useAuthentication';
import {Button} from 'react-native-elements';
import {getAuth, signOut} from "firebase/auth";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import CustomButton from "../components/CustomButton";
import {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import styled from "styled-components/native";
import usePushNotifications from "../utils/hooks/usePushNotifications";
import sendPushNotification from "../utils/hooks/sendPushNotification";

const auth = getAuth();
const firestore = getFirestore();
const Space = styled.View`
  width: 100%;
  height: 8px;
`


const HomeScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const {user} = useAuthentication();
    const [username, setUsername] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [token, setToken] = useState<string>('');
    usePushNotifications();

    async function showInfo() {
        let idUser = auth.currentUser?.uid;
        if (idUser === undefined) {
            idUser = "";
        }


        getDoc(doc(firestore, 'users', idUser)).then(doc => {
            setUsername(doc.data()?.username);
            setAge(doc.data()?.age);
            setPhone(doc.data()?.phone);
            setToken(doc.data()?.token);

        });
        console.log(token)

    }
    async function showNotif(){

        await sendPushNotification({
            pushToken: token,
            message: "exp://192.168.0.43:19000/--/curse",
            title: "hello"
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.homeText}>Welcome {user?.email}!</Text>
            <Space/>
            <Space/>
            <View style={styles.inputContainer}>
                <Text style={styles.input}>Username: {username}</Text>
                <Space/>
                <Text style={styles.input}>Age: {age}</Text>
                <Space/>
                <Text style={styles.input}>Phone: {phone}</Text>
            </View>
            <Space/>
            <View style={styles.buttonContainer}>
                <CustomButton label={'Show info'} onPress={showInfo} width={200}/>
                <Space/>
                <CustomButton label={"Edit info"} onPress={() => navigation.navigate("Edit")} width={200}/>
                <Space/>
                <CustomButton label={"Spre curse"} width={200} onPress={() => navigation.navigate("Curse")}/>
                <Space/>
                <CustomButton label={"Show notif"} width={200} onPress={showNotif}/>
                <Space/>
                <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)}/>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homeText: {
        fontSize: 32,
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        paddingTop: 40
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    button: {
        marginTop: 10
    }
});

export default HomeScreen;