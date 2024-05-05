import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../../screens/home/Home';

// Mockowanie obiektu nawigacji
const mockNavigation = {
  navigate: jest.fn(),
};

// Opis testów dla komponentu Home
describe('Home Component', () => {
  it('renders correctly', () => {
    // Renderowanie komponentu Home z przekazaniem obiektu nawigacji
    const { getByText } = render(<Home navigation={mockNavigation} />);

    // Sprawdzenie czy komponent renderuje oczekiwane teksty
    expect(getByText('MY NEW HOMIE')).toBeTruthy();
    expect(getByText('NIE WAŻNE GDZIE, WAŻNE Z KIM')).toBeTruthy();
    expect(getByText('Znajdź współlokatora')).toBeTruthy();
  });

  it('navigates to "Search" screen when button is pressed', () => {
    // Renderowanie komponentu Home z przekazaniem obiektu nawigacji
    const { getByText } = render(<Home navigation={mockNavigation} />);

    // Symulacja naciśnięcia przycisku
    fireEvent.press(getByText('Znajdź współlokatora'));

    // Sprawdzenie czy funkcja navigate została wywołana z odpowiednim argumentem
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Search');
  });
});
