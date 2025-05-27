import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    Voice.onSpeechStart = () => console.log('🎙️ Listening...');
    Voice.onSpeechEnd = () => console.log('🛑 Stopped listening');
    Voice.onSpeechResults = (e) => {
      setTranscript(e.value[0]);
    };
    Voice.onSpeechError = (e) => {
      setError(e.error.message);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setTranscript('');
      setError(null);
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {
      console.error('Start error:', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error('Stop error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🎧 Paulie Go - Voice Test</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Transcript:</Text>
        <Text style={styles.transcript}>{transcript || 'Say something...'}</Text>
        {error && <Text style={styles.error}>⚠️ {error}</Text>}
      </View>

      <Button
        title={isListening ? '🛑 Stop Listening' : '🎤 Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  heading: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  box: { marginBottom: 30, padding: 16, borderRadius: 8, backgroundColor: '#f2f2f2' },
  label: { fontWeight: 'bold', fontSize: 16 },
  transcript: { fontSize: 18, marginTop: 8 },
  error: { color: 'red', marginTop: 8 },
});
