// Importy bibliotek i funkcji, które będą używane do testowania.
import { renderHook, act } from '@testing-library/react-native';
import { useUserContext } from '../../providers/user-provider/UserProvider'; // Import funkcji używanej z kontekstu użytkownika.
import useSignIn from '../../hooks/useSignIn'; // Import funkcji do testowania.

// Mockowanie kontekstu użytkownika, aby dostarczyć kontrolę nad funkcją dispatch.
jest.mock('../../providers/user-provider/UserProvider', () => ({
  useUserContext: jest.fn(), // Mockowanie funkcji useUserContext.
}));

// Opis testów funkcji useSignIn.
describe('useSignIn', () => {
  const dispatchMock = jest.fn(); // Tworzenie mocka funkcji dispatch.

  // Przygotowanie środowiska testowego przed każdym testem.
  beforeEach(() => {
    useUserContext.mockReturnValue({ dispatch: dispatchMock }); // Ustawienie mocka funkcji dispatch za każdym razem przed testem.
  });

  // Test sprawdzający, czy status jest ustawiony na wartość inną niż domyślna po wywołaniu funkcji signIn.
  it('should set status out of default when signIn is called', async () => {
    const { result } = renderHook(() => useSignIn()); // Utworzenie hooka używając renderHook.

    // Oczekiwane ustawienie statusu na 'default' przed wywołaniem funkcji signIn.
    expect(result.current.status).toBe('default');

    // Wywołanie funkcji signIn.
    await act(async () => {
      await result.current.signIn({ username: 'test', password: 'password' });
    });

    // Sprawdzenie, czy status nie jest już 'default'.
    expect(result.current.status).not.toBe('default');
  });

  // Test sprawdzający, czy status zostaje ustawiony na 'success' i czy funkcja dispatch jest wywołana z odpowiednimi parametrami, gdy odpowiedź jest poprawna.
  it('should set status to success and dispatch token when response is ok', async () => {
    const token = 'mock-token'; // Utworzenie przykładowego tokenu.

    // Mockowanie funkcji fetch, aby zwrócić poprawną odpowiedź.
    global.fetch = jest.fn().mockResolvedValue({
      ok: true, // Ustawienie flagi ok na true, aby symulować poprawną odpowiedź.
      json: () => Promise.resolve({ token }), // Zwrócenie przykładowego tokenu jako odpowiedź w formacie JSON.
    });

    const { result } = renderHook(() => useSignIn()); // Utworzenie hooka używając renderHook.

    // Wywołanie funkcji signIn.
    await act(async () => {
      await result.current.signIn({ username: 'test', password: 'password' });
    });

    // Sprawdzenie, czy status został ustawiony na 'success'.
    expect(result.current.status).toBe('success');

    // Sprawdzenie, czy funkcja dispatch została wywołana z odpowiednimi parametrami.
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'SET_TOKEN', // Oczekiwany typ akcji.
      payload: { token }, // Oczekiwany ładunek akcji zawierający token.
    });
  });
});
