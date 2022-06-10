import React, {useState} from "react";
import {useCursaContext, CURSA_STATUS} from "../context/CursaContext";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";
import {StyleSheet, Text, TextInput, View} from "react-native";


const Container = styled.View`
  width: 100%;
  flex-direction: row;
`
const Input = styled.TextInput`
  height: 50px;
  border: 1px solid;
  padding: 4px;
  border-radius: 4px;
  margin-right: 12px;
  flex: 1;
`

const CursaInput = () => {
    const {addCursa}=useCursaContext();
    const [destinatie, setDestinatie]=useState<string>('');
    const [plecare, setPlecare]=useState<string>('');
    const handleAdauga= () =>{
        if(destinatie && plecare) {
            addCursa({
                title: destinatie + ' ' + plecare,
                status: CURSA_STATUS.ON_TIME
            });
            setDestinatie('');
            setPlecare('');
        }

    }
    return (
        <>
        <Container style={styles.inputContainer}>
            <Input style={styles.input}
                placeholder={"Destinatie"}
                value={destinatie}
                onChangeText={setDestinatie}/>
            <Input style={styles.input}
                placeholder={"Plecare"}
                value={plecare}
                onChangeText={setPlecare}/>

        <CustomButton label={"Adauga cursa"} width={80} onPress={handleAdauga}/>
        </Container>
        </>
    )

}

const styles = StyleSheet.create({
    editText: {
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



});


export default CursaInput;