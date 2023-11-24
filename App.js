import { StatusBar } from 'expo-status-bar';
import * as Font from "expo-font";
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/components/screens/home_screen';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';

const getFonts = () =>
   Font.loadAsync({
    "OpenSans": require('./assets/fonts/OpenSans-Regular.ttf'),
    "OpenSans SemiBold": require('./assets/fonts/OpenSans-SemiBold.ttf'),
    "OpenSans Bold": require('./assets/fonts/OpenSans-Bold.ttf'),
    "OpenSans Medium": require('./assets/fonts/OpenSans-Medium.ttf'),
  })

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return (
    <HomeScreen/>
  );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.log('Error AppLoading')}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
