import React, {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import CursaContext, {ICursa} from "../context/CursaContext";
import styled from "styled-components/native";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import CursaInput from "../components/CursaInput";
import {FlatList} from "react-native";
import Cursa from "../components/Cursa";

const Container=styled.View`
  padding: 8px;
  height: 100%;
  width: 100%;
`;

const Space=styled.View`
  width: 100%;
  height: 8px;
`

const CurseScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [curse, setCurse]=useState<ICursa[]>([]);
    const addCursa=(newItem: ICursa)=>{
        setCurse([...curse,newItem]);
    }

    console.log(curse);
    return (
        <Container style={styles.container}>
            <StatusBar/>
            <CursaContext.Provider value={{
                addCursa,
            }}>
                <CursaInput/>
                <Space/>

                <FlatList
                    ItemSeparatorComponent={Space}
                    keyExtractor={(_, index:number)=>index.toString()}
                    data={curse} renderItem={({item,index})=>(
                    <Cursa cursa={item} index={index} />
                )}/>

            </CursaContext.Provider>

        </Container>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 20,
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default CurseScreen;