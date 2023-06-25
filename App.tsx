import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView >
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
