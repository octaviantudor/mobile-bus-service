import {getAuth} from "firebase/auth";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../components/CustomButton";
import {StackScreenProps} from "@react-navigation/stack";
import styled from "styled-components/native";

const auth = getAuth();
const firestore = getFirestore();

const Space=styled.View`
  width: 100%;
  height: 8px;
`
const EditScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [username, setUsername]=useState<string>('');
    const [age, setAge]=useState<string>('');
    const [phone, setPhone]=useState<string>('');
    const [token, setToken] = useState<string>('');
    let IdUser = auth.currentUser?.uid;

    console.log(IdUser);
    if (IdUser === undefined) {
        IdUser = '';
    }

    async function getInfo() {
         getDoc(doc(firestore, 'users', IdUser ? IdUser : " ")).then(doc => {
             setUsername(doc.data()?.username);
             setAge(doc.data()?.age);
             setPhone(doc.data()?.phone);
             setToken(doc.data()?.token);
         });
    }

    async function submitEdit() {
        await setDoc(doc(firestore, "users", IdUser ? IdUser : " "), {
            phone: phone,
            username: username,
            age: age,
            token: token
        });
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <Text>Edit info screen!</Text>
            <Space/>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Username'
                    value={username}
                    onChangeText={(text) =>setUsername(text)}
                    style={styles.input}
                />
                <Space/>
                <TextInput
                    placeholder='Phone'
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    style={styles.input}
                />
                <Space/>
                <TextInput
                    placeholder='Age'
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    style={styles.input}
                />
                <Space/>
                <View style={styles.buttonContainer}>
                <CustomButton label={"Confirm edit"} onPress={submitEdit} width={150}/>
                <Space/>
                <CustomButton label={"Show data"} onPress={getInfo} width={150}/>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer:{
        width: '80%',
        paddingTop: 40
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5
    },

    buttonContainer:{
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40
    },



    controls: {
        flex: 1,
    },


});


export default EditScreen;