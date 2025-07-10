import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import TimerContext from './TimerContext';

export default function HistoryScreen() {
  const { state } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers History</Text>
      {state.history.length === 0 ? (
        <Text style={styles.noHistory}>No completed timers yet.</Text>
      ) : (
        <FlatList
          data={state.history}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.timerName}>{item.name}</Text>
              <Text style={styles.time}>
                Completed at: {new Date(item.completedAt || item.completedAtDate || Date.now()).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  noHistory: {
    fontStyle: 'italic',
    color: '#555',
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  timerName: {
    fontSize: 18,
  },
  time: {
    color: '#666',
    fontSize: 14,
  },
});
