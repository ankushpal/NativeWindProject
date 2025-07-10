import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TimerContext from './TimerContext';
import ProgressBar from './ProgressBar';

export default function TimerCard({ timer }) {
  const { dispatch } = useContext(TimerContext);
  const progress = 1 - timer.remaining / timer.duration;
    console.log('progress',timer);
    
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>Status: {timer.status}</Text>
      <Text style={{marginBottom:10}}>Remaining: {timer.remaining}s</Text>
      <ProgressBar progress={progress} height={8} progressColor="#007AFF" />
      <View style={styles.buttonsContainer}>
        <Button title="Start" onPress={() => dispatch({ type: 'START_TIMER', payload: timer.id })} />
        <Button title="Pause" onPress={() => dispatch({ type: 'PAUSE_TIMER', payload: timer.id })} />
        <Button title="Reset" onPress={() => dispatch({ type: 'RESET_TIMER', payload: timer.id })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
