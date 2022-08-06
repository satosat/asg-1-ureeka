import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/login';
import Register from '../components/register';
import Home from '../components/home';

const Stack = createNativeStackNavigator();

function PageNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default PageNavigator;
