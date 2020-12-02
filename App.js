import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoList from './TodoList';
import Login from './Login';

// STATELESS
export default function App() {
  return (
    <View style={styles.container}>
      <Login></Login>
      <StatusBar style="auto" />
    </View>)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});