import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <Text>Contacts App</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
