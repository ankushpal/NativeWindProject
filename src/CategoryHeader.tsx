import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CategoryHeaderProps = {
  category: string;
  expanded: boolean;
  onToggle: () => void;
  onStartAll: () => void;
  onPauseAll: () => void;
  onResetAll: () => void;
};

export default function CategoryHeader({
  category,
  expanded,
  onToggle,
  onStartAll,
  onPauseAll,
  onResetAll,
}: CategoryHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.titleContainer}>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.toggle}>{expanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onStartAll} style={styles.button}>
          <Text style={styles.buttonText}>Start All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPauseAll} style={styles.button}>
          <Text style={styles.buttonText}>Pause All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onResetAll} style={styles.button}>
          <Text style={styles.buttonText}>Reset All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggle: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
