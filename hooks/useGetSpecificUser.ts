import { useState } from 'react';

import { API_URL } from '../lib/const';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { Gender } from '../providers/user-provider/types';
import { FormStatus } from '../screens/types';

export interface SpecificUserInfo {
  searchDTO: {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    gender: string;
    online: boolean;
    photo: string;
    score: number;
    description: string;
  };
  characteristicsDTO: {
    sleepTime: number;
    cooking: number;
    invitingFriends: number;
    timeSpentOutsideHome: number;
    characterType: number;
    talkativity: number;
    conciliatory: number;
    likesPets: number;
    hasPets: 0 | 1;
    smokes: 0 | 1;
    drinks: 0 | 1;
    isStudent: 0 | 1;
    works: 0 | 1;
    acceptsPets: 0 | 1;
    acceptsSmoking: 0 | 1;
    preferedGender: Gender;
    livesIn: string;
    userId: number;
  };
  flatDTO: {
    description: string;
    latitude: number;
    longitude: number;
    numberOfPeople: number;
    numberOfRooms: number;
    searchOption: number;
    photos: any;
  };
}

export default function useGetSpecificUser() {
  const [status, setStatus] = useState<FormStatus>('default');
  const {
    state: { token },
  } = useUserContext();
  const [data, setData] = useState<SpecificUserInfo>();

  const getSpecificUser = async (id: number) => {
    setStatus('loading');
    try {
      const response = await fetch(API_URL + `user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('pobrane');
        setStatus('success');
        setData(await response.json());
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return {
    status,
    data,
    getSpecificUser,
  };
}
