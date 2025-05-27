import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const speak = () => {
    Speech.speak("Hey! I'm Paulie. Let's hit the road!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🚗 Paulie Go - Talking Mode</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Press the button to hear Paulie speak:</Text>
      </View>

      <Button title="🎤 Talk to Me!" onPress={speak} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  heading: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  box: { marginBottom: 30, padding: 16, borderRadius: 8, backgroundColor: '#f2f2f2' },
  label: { fontWeight: 'bold', fontSize: 16 },
});
