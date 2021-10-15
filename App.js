import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Profile from './src/screens/profilescreen.js';
import HomeScreen from './src/screens/homescreen.js';
import CreateScreen from './src/screens/createscreen.js';
import Navigation from './src/navigation/navigation.js';
import SignupScreen from './src/screens/signupscreen.js';
import LoginScreen from './src/screens/loginscreen.js';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};

export default function App() {
  return (
    <>
      <PaperProvider theme={theme}>
      <StatusBar backgroundColor="#00FF00" />
      <Navigation />
      </PaperProvider>
    </>
  );
}
