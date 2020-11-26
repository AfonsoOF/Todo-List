import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Olá mundo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#FFFFFF',
        fontSize: 24
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});