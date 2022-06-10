import styled from "styled-components/native";
import React from "react";
import {ICursa, CURSA_STATUS} from "../context/CursaContext";
import {StyleSheet, Text} from "react-native";
import Animated, {BounceInRight, FlipInEasyY} from "react-native-reanimated";

const Title = styled.Text`
  font-weight: bold;

`;

const labelMap: { [key in CURSA_STATUS]: string } = {
    [CURSA_STATUS.CANCELED]: 'CANCELED',
    [CURSA_STATUS.ON_TIME]: 'ON TIME',
    [CURSA_STATUS.DELAYED]: 'DELAYED',
    [CURSA_STATUS.POSTPONED]: 'POSTPONED'
}

const Cursa: React.FC<{ cursa: ICursa; index: number }> = ({cursa, index}) => {
    const {status, title} = cursa;
    return (

        <Animated.View entering={FlipInEasyY}
                       style={styles.container}>
            <Title>{title}</Title>
            <Text>{labelMap[status]}</Text>
        </Animated.View>

    )

};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "white",
        borderRadius:1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:4
    }

});
export default Cursa;