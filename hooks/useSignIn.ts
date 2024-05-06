// Logika do logowania się

import { useEffect, useState } from 'react';

import { API_URL } from '../lib/const';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { setTokenAction } from '../providers/user-provider/actions';
import { LoginData } from '../screens/login/types';
import { FormStatus } from '../screens/types';

interface TokenResponse {
  token: string;
}

export default function useSignIn() {
  const [status, setStatus] = useState<FormStatus>('default');
  const { dispatch } = useUserContext();
  const [message, setMessage] = useState<string>('');

  const signIn = async (data: LoginData) => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const token: TokenResponse = await response.json();

        dispatch(
          setTokenAction({
            token: token.token,
          })
        );
        setStatus('success');
      } else if (response.status === 423) {
        setStatus('error');
        setMessage('Potwierdź adres email');
      } else if (response.status === 403) {
        setMessage('Podano niepoprawne dane logowania');
        setStatus('error');
      } else {
        setMessage('Wystąpił błąd');
        setStatus('error');
      }
    } catch {
      setMessage('Wystąpił błąd');

      setStatus('error');
    }
  };

  return {
    status,
    signIn,
    setStatus,
    message,
  };
}
