import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView, Text, TextInput, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import Form from '../utils/form';

export default function Login() {
  const styles = StyleSheet.create({
    inputField: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      marginHorizontal: 20,
      borderRadius: 15,
    },
    loginBtn: {
      alignItems: 'center',
      backgroundColor: '#62E37B',
      padding: 10,
      marginTop: 40,
      marginHorizontal: 20,
      borderRadius: 20,
    },
    text: {
      margin: 10,
      marginHorizontal: 20,
      fontSize: 18,
    },
    divider: {
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderHeight: 1,
      marginTop: 10,
      marginHorizontal: 20,
    },
    registerBtn: {
      alignItems: 'center',
      backgroundColor: '#885AD1',
      padding: 10,
      marginTop: 10,
      marginHorizontal: 20,
      borderRadius: 20,
    },
    error: {
      color: 'red',
      fontWeight: '600',
      backgroundColor: '#FFC4C4',
      padding: 10,
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidResponse, setResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigator = useNavigation();

  const validateInput = () => (email !== '' || password !== '');

  const sendRequest = async () => {
    if (validateInput) {
      setResponse(true);
      setErrorMessage('Fields cannot be blank');
      return;
    }

    const formData = new FormData();
    formData.append('user-id', email);
    formData.append('user-password', password);

    const url = 'https://mustseeum.com/api/account/login';
    const response = await Form(url, formData);

    if (response['error-code'] !== '0') {
      setResponse(true);
      setErrorMessage('Data not found');
    } else {
      setResponse(false);
      navigator.navigate('Home');
    }
  };

  return (
    <SafeAreaView>
      <View>
        {invalidResponse && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={sendRequest}
      >
        <Text style={{ fontSize: 18 }}>Login</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => navigator.navigate('Register')}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
