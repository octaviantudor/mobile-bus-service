import React, {useState} from "react";
import {useCursaContext, CURSA_STATUS} from "../context/CursaContext";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";



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
        <Container>
            <Input
                placeholder={"Destinatie"}
                value={destinatie}
                onChangeText={setDestinatie}/>
            <Input
                placeholder={"Plecare"}
                value={plecare}
                onChangeText={setPlecare}/>

        <CustomButton label={"Adauga cursa"} width={80} onPress={handleAdauga}/>
        </Container>
        </>
    )

}

export default CursaInput;