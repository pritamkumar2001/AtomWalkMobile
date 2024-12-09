import React, { useEffect, useState } from 'react';
import MainContainer from './src/navigation/MainContainer';
import { AuthProvider } from './src/context/AuthContext';
import AuthScreen from './src/navigation/AuthScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

export default function App() {
  const [correctMPIN, setCorrectMPIN] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMPIN = async () => {
      try {
        const storedMPIN = await AsyncStorage.getItem('userPin');
        setCorrectMPIN(storedMPIN); // Set the stored mPIN
      } catch (error) {
        console.error('Error fetching mPIN from AsyncStorage:', error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchMPIN();
  }, []);

  if (loading) {
    // Show a loading spinner or screen while AsyncStorage is being fetched
    return (
      <AuthProvider>
        <MainContainer>
          <Text>Loading...</Text>
        </MainContainer>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      {correctMPIN ? <AuthScreen /> :  <MainContainer />}
    </AuthProvider>
  );
}
