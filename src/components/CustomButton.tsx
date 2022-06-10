import React from "react";
// @ts-ignore
import styled from "styled-components/native";

const ButtonLabel = styled.Text`
  color: black;

`;

const ActionButton = styled.TouchableOpacity<{ width?: number }>`
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: ${({ width }) => width ? `${width}px` : '100%'};
  border-radius: 4px;
`;

interface ICustomButton {

    label: string;
    onPress?: () => void;
    width?: number;
}


const CustomButton: React.FC<ICustomButton> = ({label, onPress, width}) => (
    <ActionButton onPress={onPress} width={width}>
        <ButtonLabel>{label}</ButtonLabel>
    </ActionButton>
)

export default CustomButton;