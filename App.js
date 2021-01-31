import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EachRound from './EachRound';
import MainPage from './MainPage';

export default function App() {
  return (
    <View style={styles.container}>
        <MainPage />
        {/* <EachRound roundCount={1} firstBuy={100} secondBuy={50}/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
