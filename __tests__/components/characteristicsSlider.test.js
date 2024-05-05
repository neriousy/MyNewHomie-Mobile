import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CharacteristicsSlider from '../../ui/characteristics/characteristics-slider/CharacteristicsSlider';

// Opis testów dla komponentu CharacteristicsSlider
describe('CharacteristicsSlider', () => {
  // Definicja danych testowych
  const name = 'Test Name';
  const trait = 'testTrait';
  const value = 3;
  const marks = ['Low', 'High'];

  // Test sprawdzający poprawne renderowanie komponentu
  test('renders correctly', () => {
    // Renderowanie komponentu CharacteristicsSlider z danymi testowymi
    const { getByText } = render(
      <CharacteristicsSlider
        name={name}
        trait={trait}
        value={value}
        marks={marks}
      />
    );

    // Sprawdzenie czy elementy tekstowe zostają poprawnie zrenderowane
    expect(getByText(name)).toBeTruthy();
    expect(getByText(marks[0])).toBeTruthy();
    expect(getByText(marks[1])).toBeTruthy();
  });

  // Test sprawdzający czy funkcja setValue zostaje wywołana po zmianie wartości suwaka
  test('calls setValue when slider value changes', () => {
    // Mock funkcji setValue
    const setValueMock = jest.fn();
    // Renderowanie komponentu CharacteristicsSlider z danymi testowymi oraz mockowaną funkcją setValue
    const { getByTestId } = render(
      <CharacteristicsSlider
        name={name}
        trait={trait}
        value={value}
        marks={marks}
        setValue={setValueMock}
      />
    );

    // Symulacja zmiany wartości suwaka
    fireEvent(getByTestId('slider'), 'valueChange', 4);
    // Sprawdzenie czy funkcja setValue została wywołana z odpowiednimi argumentami
    expect(setValueMock).toHaveBeenCalledWith(4, trait);
  });

  // Test sprawdzający czy funkcja setValue nie zostaje wywołana gdy suwak jest wyłączony
  test('does not call setValue when disabled', () => {
    // Mock funkcji setValue
    const setValueMock = jest.fn();
    // Renderowanie komponentu CharacteristicsSlider z danymi testowymi, wyłączonym suwakiem oraz mockowaną funkcją setValue
    const { getByTestId } = render(
      <CharacteristicsSlider
        name={name}
        trait={trait}
        value={value}
        marks={marks}
        setValue={setValueMock}
        disabled={true}
      />
    );

    // Symulacja zmiany wartości suwaka
    fireEvent(getByTestId('slider'), 'valueChange', 2);
    // Sprawdzenie czy funkcja setValue nie została wywołana
    expect(setValueMock).not.toHaveBeenCalled();
  });
});
