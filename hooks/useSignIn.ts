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
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    signIn({
      email: 'hejmowskifilip@gmail.com',
      password: 'Spidmen123@',
    });
  }, []);

  return {
    status,
    signIn,
  };
}
