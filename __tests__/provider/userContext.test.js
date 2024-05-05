import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import {
  UserContextProvider,
  useUserContext,
} from '../../providers/user-provider/UserProvider';

// Mock dla funkcji getUserInfo oraz innych funkcji z użytku
jest.mock('../../providers/user-provider/utils', () => ({
  getUserInfo: jest.fn(() =>
    Promise.resolve({
      userId: 123,
      username: 'testUser',
      firstname: 'Test',
      lastname: 'User',
      gender: 'M',
      age: 25,
      phonenumber: '123456789',
      description: 'Test user description',
      still_looking: true,
    })
  ),
  getCharacteristics: jest.fn(() => Promise.resolve(['friendly', 'organized'])),
  getPhoto: jest.fn(() => Promise.resolve('photo-url')),
  updateOnline: jest.fn(),
}));

// Opis testów dla UserContext
describe('UserContext', () => {
  it('should set initial data when component is rendered ', async () => {
    // Komponent testowy
    const TestComponent = () => {
      const { state } = useUserContext();
      return (
        <View testID="user-info">
          <Text>{JSON.stringify(state)}</Text>
        </View>
      );
    };

    // Renderowanie komponentu testowego w kontekście UserContextProvider
    const { findByTestId } = render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    // Oczekiwanie pobranie komponentu
    const userInfo = await findByTestId('user-info');

    // Sprawdzenie czy dane są poprawnie ustawione
    expect(userInfo.children[0].props.children).toEqual(
      JSON.stringify({
        userStatus: 'logged-out',
        token: '',
        username: '',
        userId: 0,
        firstname: '',
        lastname: '',
        gender: 'M',
        age: 0,
        phonenumber: '',
        description: '',
        still_looking: true,
        characteristics: null,
      })
    );
  });
});
