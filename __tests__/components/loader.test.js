import React from 'react';
import { render, act } from '@testing-library/react-native';
import Loader from '../../ui/shared/loader/Loader';

// Opis testów dla komponentu Loader
describe('Loader Component', () => {
  // Test sprawdzający renderowanie wskaźnika ładowania
  test('renders loading indicator', () => {
    // Renderowanie komponentu Loader
    const { getByTestId } = render(<Loader />);

    // Pobranie elementu reprezentującego wskaźnik ładowania z wykorzystaniem testID
    const loadingIndicator = getByTestId('loading-indicator');

    // Sprawdzenie czy element wskaźnika ładowania został poprawnie zrenderowany
    expect(loadingIndicator).toBeTruthy();
  });
});
