import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Font from "expo-font";
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/navigation';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Routes/>
      </GestureHandlerRootView>
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
