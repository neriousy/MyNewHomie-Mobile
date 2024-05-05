// Logika do wyszukiwania użytkowników na ekranie 'Search'

import { useState } from 'react';
import { FormStatus } from '../screens/types';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { API_URL } from '../lib/const';
import { ChatRoom } from '../providers/chat-provider/types';

export default function useGetChatMessages() {
  const [status, setStatus] = useState<FormStatus>('default');
  const {
    state: { token },
  } = useUserContext();

  const getChatMessages = async (id: number): Promise<ChatRoom[]> => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + `messages/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStatus('success');
        return await response.json();
      } else {
        setStatus('error');
        return [];
      }
    } catch (e) {
      setStatus('error');
      return [];
    }
  };

  return {
    status,
    getChatMessages,
  };
}
