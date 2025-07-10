import React, { useContext, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import uuid from 'react-native-uuid';
import TimerContext from './TimerContext';

export default function AddTimerModal({ visible, onClose }) {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (!name || !duration || !category) return;
    const newTimer = {
      id: uuid.v4(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
    };
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    onClose();
    setName('');
    setDuration('');
    setCategory('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add New Timer</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Duration (in seconds)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <View style={styles.buttonGroup}>
          <Button title="Add Timer" onPress={handleAdd} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});