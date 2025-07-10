// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TimerProvider } from './src/TimerContext';
import AppNavigator from './src/AppNavigator';
import { setupNotificationChannel } from './src';


export default function App() {
  useEffect(() => {
    setupNotificationChannel();
  }, []);
  return (
    <TimerProvider>
      <NavigationContainer>
         <AppNavigator />
      </NavigationContainer>
       
    </TimerProvider>
  );
}
