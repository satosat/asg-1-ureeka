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

  const navigator = useNavigation();

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append('user-id', email);
    formData.append('user-password', password);

    const response = await Form(formData);

    if (response['error-code'] !== '0') {
      setResponse(true);
    } else {
      navigator.navigate('Home');
    }
  };

  return (
    <SafeAreaView>
      <View>
        {invalidResponse && <Text style={styles.error}>Data not found!</Text>}
      </View>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => setPassword(text)}
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
