// Logika do zapisywania charakterystyk

import { useState } from 'react';
import { FormStatus } from '../screens/types';
import { API_URL } from '../lib/const';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { CharacteristicsType } from '../providers/user-provider/types';

export default function useSaveCharacteristics() {
  const [status, setStatus] = useState<FormStatus>('default');
  const [message, setMessage] = useState<string>('');
  const {
    state: { token },
  } = useUserContext();

  const saveCharacteristics = async (data: CharacteristicsType) => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + 'saveUserAllCharacteristics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Dane zostały zapisane pomyślnie');
      } else {
        setMessage('Wystąpił błąd');
        setStatus('error');
      }
    } catch (e) {
      setMessage('Wystąpił błąd');
      setStatus('error');
    }
  };

  return {
    status,
    saveCharacteristics,
    setStatus,
    message,
  };
}
