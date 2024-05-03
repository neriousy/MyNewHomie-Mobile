// Ekran do rejestracji

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  HelperText,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import { RegisterDataWithRepeatPassword } from './types';
import useRegister from '../../hooks/useRegister';

export default function Register() {
  const { register, status, setStatus, message } = useRegister();
  const [registerData, setRegisterData] =
    useState<RegisterDataWithRepeatPassword>({
      firstname: null,
      lastname: null,
      email: null,
      age: null,
      gender: '',
      password: null,
      repeatPassword: null,
      phonenumber: null,
    });

  const handleRegisterData = (
    value: string,
    // eslint-disable-next-line prettier/prettier
    field: keyof RegisterDataWithRepeatPassword
  ) => {
    setRegisterData((prevData) => {
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const isFormValid = () => {
    return !Object.values(registerData).some(
      // eslint-disable-next-line prettier/prettier
      (value) => value === '' || value === null
    );
  };

  const handleRegister = async (
    // eslint-disable-next-line prettier/prettier
    registerData: RegisterDataWithRepeatPassword
  ) => {
    const { repeatPassword, ...data } = registerData;

    await register(data);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <View style={styles.scrollView}>
        <Text variant="titleMedium" style={styles.label}>
          Formularz rejestracji
        </Text>
        <TextInput
          label="Imię"
          style={styles.input}
          value={registerData.firstname || ''}
          onChangeText={(value) => handleRegisterData(value, 'firstname')}
          error={registerData.firstname === ''}
        />
        <HelperText type="error" visible={registerData.firstname === ''}>
          Imie nie może być puste
        </HelperText>
        <TextInput
          label="Nazwisko"
          style={styles.input}
          value={registerData.lastname || ''}
          onChangeText={(value) => handleRegisterData(value, 'lastname')}
          error={registerData.lastname === ''}
        />
        <HelperText type="error" visible={registerData.lastname === ''}>
          Naziwsko nie może być puste
        </HelperText>
        <TextInput
          label="E-mail"
          style={styles.input}
          value={registerData.email || ''}
          onChangeText={(value) => handleRegisterData(value, 'email')}
          error={
            !!registerData.email &&
            !registerData.email?.includes('@') &&
            registerData.email?.length > 0
          }
        />
        <HelperText
          type="error"
          visible={
            !!registerData.email &&
            !registerData.email?.includes('@') &&
            registerData.email?.length > 0
          }
        >
          Email musi być podany w formacie email@domena
        </HelperText>
        <TextInput
          label="Hasło"
          style={styles.input}
          value={registerData.password || ''}
          onChangeText={(value) => handleRegisterData(value, 'password')}
          secureTextEntry
        />
        <HelperText type="error" visible={registerData.password === ''}>
          Hasło nie może być puste
        </HelperText>
        <TextInput
          label="Powtórz haslo"
          style={styles.input}
          value={registerData.repeatPassword || ''}
          onChangeText={(value) => handleRegisterData(value, 'repeatPassword')}
          secureTextEntry
          error={
            !!registerData.password &&
            !!registerData.repeatPassword &&
            registerData.password !== registerData.repeatPassword
          }
        />
        <HelperText
          type="error"
          visible={
            !!registerData.password &&
            !!registerData.repeatPassword &&
            registerData.password !== registerData.repeatPassword
          }
        >
          Hasła muszą być takie same
        </HelperText>

        <TextInput
          style={styles.input}
          value={registerData.age || ''}
          onChangeText={(value) => handleRegisterData(value, 'age')}
          keyboardType="numeric"
          label="Wiek"
          error={!registerData.age && registerData.age !== null}
        />
        <HelperText
          type="error"
          visible={!registerData.age && registerData.age !== null}
        >
          Imie nie może być puste
        </HelperText>

        <TextInput
          label="Numer telefonu"
          style={styles.input}
          value={registerData.phonenumber || ''}
          onChangeText={(value) => handleRegisterData(value, 'phonenumber')}
          keyboardType="numeric"
          error={
            registerData.phonenumber !== null &&
            registerData.phonenumber.length !== 9
          }
        />
        <HelperText
          type="error"
          visible={
            registerData.phonenumber !== null &&
            registerData.phonenumber.length !== 9
          }
        >
          Numer telefonu musi mieć długość 9 znaków
        </HelperText>

        <Text variant="labelLarge" style={styles.label}>
          Płeć
        </Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="M"
            status={registerData.gender === 'M' ? 'checked' : 'unchecked'}
            onPress={() => handleRegisterData('M', 'gender')}
          />
          <Text>Mężczyzna</Text>
        </View>

        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="M"
            status={registerData.gender === 'K' ? 'checked' : 'unchecked'}
            onPress={() => handleRegisterData('K', 'gender')}
          />
          <Text>Kobieta</Text>
        </View>

        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="M"
            status={registerData.gender === 'O' ? 'checked' : 'unchecked'}
            onPress={() => handleRegisterData('O', 'gender')}
          />
          <Text>Inna</Text>
        </View>

        <Button
          mode="contained"
          disabled={!isFormValid() || status === 'loading'}
          onPress={() => handleRegister(registerData)}
        >
          Zarejestruj się
        </Button>

        <Snackbar
          visible={status === 'error' || status === 'success'}
          onDismiss={() => setStatus('default')}
          action={{
            label: 'Schowaj',
            onPress: () => {
              setStatus('default');
            },
          }}
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
  containerScrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: '100%',
  },

  button: {
    width: '80%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  radioButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  genderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  label: {
    width: '100%',
    textAlign: 'left',
  },
});
