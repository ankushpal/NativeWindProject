import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';


export type RootStackParamList = {
  Home: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Timers' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Timer History' }} />
    </Stack.Navigator>
  );
}
