import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignOutScreen from '../screens/SignUpScreen';
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Sign In" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={SignOutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}