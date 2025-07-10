import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Button, Platform, PermissionsAndroid, TouchableOpacity, Text, View } from 'react-native';
import TimerContext from './TimerContext';
import AddTimerModal from './AddTimerModal';
import CategoryGroup from './CategoryGroup';
import useNavigateOnComplete from './useNavigateOnComplete';

export default function HomeScreen() {
  const { state, dispatch } = useContext(TimerContext);
  const [modalVisible, setModalVisible] = useState(false);
async function requestAndroidNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn('Notification permission denied');
    }
  }
};
useEffect(() => {
    requestAndroidNotificationPermission()
},[]);
useNavigateOnComplete();
  const groupedTimers = state.timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {} as Record<string, typeof state.timers>);

  const handleBulkAction = (category: string, type: string) => {
    groupedTimers[category].forEach(timer => {
      dispatch({ type, payload: timer.id });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      state.timers.forEach(timer => {
        if (timer.status === 'Running') {
          dispatch({ type: 'TICK', payload: timer.id });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers, dispatch]);

  return (
   <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 80 }}>
        {Object.keys(groupedTimers).map((category) => (
          <CategoryGroup
            key={category}
            category={category}
            timers={groupedTimers[category]}
            onBulkAction={handleBulkAction}
          />
        ))}
      </ScrollView>

      <AddTimerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <View style={{
        position: 'absolute',
        bottom: '5%',
        left: 20,
        right: 20,
        backgroundColor: 'blue',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: '#fff', fontSize: 16 , flex:1}}>Add Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
