import React from 'react';
import "react-native-gesture-handler";
import './src/config/firebase';
import RootNavigation from "./src/navigation";
import {ThemeProvider} from "react-native-elements";



export default function App() {
  return (
      <ThemeProvider>
      <RootNavigation />
      </ThemeProvider>
  );
}

