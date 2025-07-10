import React, { createContext, useReducer, useEffect, useState } from 'react';
import useAsyncStorage from './useAsyncStorage';
import { showLocalNotification } from './notifications';

export type Timer = {
  id: string;
  name: string;
  duration: number; // seconds
  remaining: number; // seconds
  category: string;
  status: 'Running' | 'Paused' | 'Completed';
  halfwayAlertTriggered?: boolean;
  completedAt?: number; // timestamp
};

type State = {
  timers: Timer[];
  history: Timer[];
};

type Action =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'TICK'; payload: string }
  | { type: 'MARK_COMPLETED'; payload: string }
  | { type: 'LOAD_STATE'; payload: State };

const initialState: State = {
  timers: [],
  history: [],
};

const STORAGE_KEY = '@timer_app_state';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };

    case 'START_TIMER':      
      return {
        ...state,
        timers: state.timers.map(t =>
          t.id === action.payload && t.status !== 'Completed'
            ? { ...t, status: 'Running' }
            : t
        ),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map(t =>
          t.id === action.payload && t.status === 'Running'
            ? { ...t, status: 'Paused' }
            : t
        ),
      };

    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map(t =>
          t.id === action.payload
            ? { ...t, status: 'Paused', remaining: t.duration, halfwayAlertTriggered: false }
            : t
        ),
      };

    case 'TICK':
      return {
        ...state,
        timers: state.timers.map(t => {
          if (t.id === action.payload && t.status === 'Running') {
            const newRemaining = t.remaining - 1;
            if (newRemaining <= 0) {
              return { ...t, remaining: 0, status: 'Completed' };
            }
            return { ...t, remaining: newRemaining };
          }
          return t;
        }),
      };

    case 'MARK_COMPLETED':
      const completedTimer = state.timers.find(t => t.id === action.payload);
  if (!completedTimer) return state;

  const completedWithTime: Timer = {
    ...completedTimer,
    status: 'Completed' as const,  // fix here
    remaining: 0,
    completedAt: Date.now(),
  };
  console.log('Timer Completed');
  
  showLocalNotification('Timer Completed', 'Your timer has finished!');

  //showCompletionNotification(completedTimer.name);
  return {
    timers: state.timers.filter(t => t.id !== action.payload),
    history: [...state.history, completedWithTime],
  };

    default:
      return state;
  }
}

type TimerContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const TimerContext = createContext<TimerContextType>({
  state: initialState,
  dispatch: () => null,
});

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storedValue, setValue, loading, error } = useAsyncStorage<State>(STORAGE_KEY, initialState);
  const [state, dispatch] = React.useReducer(
    reducer,
    storedValue || initialState,
    (init) => init
  );
   const [hasLoaded, setHasLoaded] = useState(false);
   useEffect(() => {
    if (!hasLoaded && !loading && storedValue) {
      dispatch({ type: 'LOAD_STATE', payload: storedValue });
      setHasLoaded(true);
    }
  }, [loading, storedValue, hasLoaded]);
useEffect(() => {
  state.timers.forEach(timer => {
    if (timer.status === 'Completed') {
      dispatch({ type: 'MARK_COMPLETED', payload: timer.id });
    }
  });
}, [state.timers]);
  useEffect(() => {
    if (!loading) {
      setValue(state);
    }
  }, [state, loading, setValue]);

  if (loading) {
    return null; 
  }

  if (error) {
    console.error('Error loading timer state:', error);
  }
  console.log('storedValue',JSON.stringify(storedValue));
  

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
