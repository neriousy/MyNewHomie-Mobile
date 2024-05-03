// Logika do logowania się

import { useState } from 'react';

import { API_URL } from '../lib/const';
import { RegisterData } from '../screens/register/types';
import { FormStatus } from '../screens/types';

export default function useRegister() {
  const [status, setStatus] = useState<FormStatus>('default');
  const [message, setMessage] = useState<string>('');

  const register = async (data: RegisterData) => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + 'auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setStatus('success');
        setMessage('Zarejestrowanie powiodło się. Potwierdź swój adres email');
      } else if (response.status === 226) {
        setStatus('error');
        setMessage('Email jest zajęty');
      }
    } catch {
      setStatus('error');
      setMessage('Wystąpił nieznany błąd');
    }
  };

  return {
    status,
    register,
    setStatus,
    message,
  };
}
