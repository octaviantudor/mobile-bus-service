import React, {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import CursaContext, {ICursa} from "../context/CursaContext";
import styled from "styled-components/native";
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

const CurseScreen: React.FC<StackScreenProps
<any>> = ({navigation}) => {
    const [curse, setCurse]=useState<ICursa[]>([]);
    const addCursa=(newItem: ICursa)=>{
        setCurse([...curse,newItem]);
    }

    console.log(curse);
    return (
        <Container>
            <StatusBar/>
            <CursaContext.Provider value={{
                addCursa
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


export default CurseScreen;