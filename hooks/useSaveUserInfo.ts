// Logika do zapisywania informacji o użytkowniku

import { useState } from 'react';

import { API_URL } from '../lib/const';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { UserInfo } from '../providers/user-provider/types';
import { FormStatus } from '../screens/types';

export default function useSaveUserInfo() {
  const [status, setStatus] = useState<FormStatus>('default');
  const [message, setMessage] = useState<string>('');
  const {
    state: { token },
  } = useUserContext();

  const saveUserInfo = async (data: UserInfo) => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + 'saveUserInfo', {
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
    } catch {
      setMessage('Wystąpił błąd');
      setStatus('error');
    }
  };

  return {
    status,
    saveUserInfo,
    setStatus,
    message,
  };
}
