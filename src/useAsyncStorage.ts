import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadValue() {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue != null) {
          setStoredValue(JSON.parse(jsonValue));
        }
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    loadValue();
  }, [key]);

  const setValue = async (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      setError(e as Error);
    }
  };

  return { storedValue, setValue, loading, error };
}
