import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PageNavigator from './utils/PageNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <PageNavigator />
    </NavigationContainer>
  );
}
