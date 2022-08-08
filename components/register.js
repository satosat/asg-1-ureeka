import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Form from '../utils/form';

export default function Register() {
  const styles = StyleSheet.create({
    registerBtn: {
      alignItems: 'center',
      backgroundColor: '#885AD1',
      padding: 10,
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 20,
    },
    textInput: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      marginHorizontal: 20,
      borderRadius: 15,
    },
    text: {
      margin: 10,
      marginHorizontal: 20,
    },
    error: {
      color: 'red',
      fontWeight: '600',
      backgroundColor: '#FFC4C4',
      padding: 10,
    },
  });

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [invalidRegistration, setInvalidRegistration] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigator = useNavigation();

  const validateInput = () => (
    email !== ''
    || phone !== ''
    || name !== ''
    || password !== ''
  );

  const sendRequest = async () => {
    if (validateInput) {
      setInvalidRegistration(true);
      setErrorMessage('Fields cannot be blank');
      return;
    }

    const formdata = new FormData();
    formdata.append('user-email', email);
    formdata.append('user-phone', phone);
    formdata.append('user-name', name);
    formdata.append('user-password', password);

    const url = 'https://mustseeum.com/api/account/register';
    const response = await Form(url, formdata);

    if (response.message !== 'Success') {
      setInvalidRegistration(true);
    } else {
      setInvalidRegistration(false);
      navigator.navigate('Home');
    }
  };

  return (
    <SafeAreaView>

      <View
        style={{
          marginBottom: 10,
        }}
      >

        <View>
          {invalidRegistration && <Text style={styles.error}>{errorMessage}</Text>}
        </View>

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />

        <Text style={styles.text}>Phone</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPhone(text)}
        />

        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={sendRequest}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
