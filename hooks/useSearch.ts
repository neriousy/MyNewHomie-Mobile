import { useState } from 'react';
import { FormStatus } from '../screens/types';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { API_URL } from '../lib/const';
import { Gender } from '../providers/user-provider/types';

export interface SearchParams {
  age_from: number;
  age_to: number;
  city: string;
  gender: string;
  ifStudent: boolean;
  ifWorking: boolean;
  ifSmoking: boolean;
  ifDrinkingAlc: boolean;
}
export interface UserSearch {
  age: number;
  description: string;
  firstname: string;
  gender: Gender;
  id: number;
  lastname: string;
  online: boolean;
  photo: string;
  score: number;
}

export default function useSearch() {
  const [status, setStatus] = useState<FormStatus>('default');
  const {
    state: { token },
  } = useUserContext();
  const [data, setData] = useState<UserSearch[]>([]);

  const search = async (data: SearchParams) => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + 'test_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setData(await response.json());
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return {
    status,
    data,
    search,
  };
}
