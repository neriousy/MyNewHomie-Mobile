import { convertToDate } from '../../lib/utilts';

describe('convertToDate function', () => {
  // Test sprawdzający, czy funkcja convertToDate zwraca poprawny obiekt typu Date.
  test('should return a valid Date object', () => {
    // Dane testowe
    const year = 2024;
    const month = 5; // May
    const day = 5;
    const hours = 12;
    const minutes = 30;
    const seconds = 45;
    const milliseconds = 500;

    // Wywołanie funkcji convertToDate z danymi testowymi
    const result = convertToDate(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );

    // Sprawdzenie, czy zwrócony obiekt jest instancją klasy Date
    expect(result instanceof Date).toBe(true);
    // Sprawdzenie, czy rok zwróconego obiektu odpowiada oczekiwanemu roku
    expect(result.getFullYear()).toBe(year);
    // Sprawdzenie, czy miesiąc zwróconego obiektu odpowiada oczekiwanemu miesiącowi (indeksowane od 0)
    expect(result.getMonth()).toBe(month - 1);
    // Sprawdzenie, czy dzień zwróconego obiektu odpowiada oczekiwanemu dniu
    expect(result.getDate()).toBe(day);
    // Sprawdzenie, czy godzina zwróconego obiektu odpowiada oczekiwanej godzinie
    expect(result.getHours()).toBe(hours);
    // Sprawdzenie, czy minuta zwróconego obiektu odpowiada oczekiwanej minucie
    expect(result.getMinutes()).toBe(minutes);
    // Sprawdzenie, czy sekunda zwróconego obiektu odpowiada oczekiwanej sekundzie
    expect(result.getSeconds()).toBe(seconds);
    // Sprawdzenie, czy milisekunda zwróconego obiektu wynosi 0 (brak precyzji do milisekundy w danych wejściowych)
    expect(result.getMilliseconds()).toBe(0);
  });
});
