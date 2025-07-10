import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import TimerContext from './TimerContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export default function useNavigateOnComplete() {
  const { state } = useContext(TimerContext);
  const navigation = useNavigation<NavigationProp>();
  const prevTimersRef = useRef(state.timers);

  useEffect(() => {
    const prevTimers = prevTimersRef.current;

    const justCompleted = state.timers.find((t, index) => {
      const prev = prevTimers[index];
      return prev && prev.status !== 'Completed' && t.status === 'Completed';
    });

    if (justCompleted) {
      navigation.navigate('History');

    }

    prevTimersRef.current = state.timers;
  }, [state.timers, navigation]);
}
