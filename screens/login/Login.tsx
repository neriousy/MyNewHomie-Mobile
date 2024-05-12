// Ekran Logowania

import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { LoginData } from './types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../Layout';
import useSignIn from '../../hooks/useSignIn';
import { KeyboardShift } from '../../ui/shared/keyboard-shift/KeyboardShift';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const { signIn, status, setStatus, message } = useSignIn();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleDataChange = (data: string, name: 'email' | 'password') => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: data,
      };
    });
  };

  const handleSignIn = useCallback((loginData: LoginData) => {
    if (loginData.email && loginData.password) {
      signIn(loginData);
    }
  }, []);

  return (
    <KeyboardShift>
      <SafeAreaView style={styles.container}>
        <Text variant="displayMedium">My new homie</Text>

        <TextInput
          mode="outlined"
          label={'E-mail'}
          style={styles.input}
          onChangeText={(value) => handleDataChange(value, 'email')}
        />
        <TextInput
          mode="outlined"
          label="Hasło"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => handleDataChange(value, 'password')}
        />

        <Button
          mode="contained"
          onPress={() => handleSignIn(loginData)}
          disabled={status === 'loading'}
        >
          Zaloguj się
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Nie masz konta? Zarejestuj się.</Text>
        </TouchableOpacity>

        <Snackbar
          visible={status === 'error' || status === 'success'}
          onDismiss={() => setStatus('default')}
          action={{
            label: 'Schowaj',
            onPress: () => {
              setStatus('default');
            },
          }}
          style={{ alignSelf: 'center', width: '100%' }}
        >
          {(status === 'error' || status === 'success') && (
            <Text
              style={{
                color: 'white',
              }}
            >
              {message}
            </Text>
          )}
        </Snackbar>

        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 20,
  },

  input: {
    width: '80%',
  },

  button: {
    width: '80%',
  },

  link: {
    color: 'blue',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
