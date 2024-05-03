import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { LoginData } from './types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../Layout';
import useSignIn from '../../hooks/useSignIn';

// Ekran Logowania

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const { signIn, status } = useSignIn();
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
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">My new homie</Text>

      <TextInput
        label={'E-mail'}
        style={styles.input}
        onChangeText={(value) => handleDataChange(value, 'email')}
      />
      <TextInput
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

      <StatusBar style="auto" />
    </SafeAreaView>
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
