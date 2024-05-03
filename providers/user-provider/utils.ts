import { API_URL } from '../../lib/const';
import { getBase64Url } from '../../lib/utilts';
import { CharacteristicsType, UserInfo } from './types';

export const getUserInfo = async (token: string) => {
  const response = await fetch(API_URL + 'userInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(token),
  });

  if (response.status === 200) {
    const json: UserInfo = await response.json();
    return json;
  }

  return false;
};

export const getCharacteristics = async (id: number, token: string) => {
  const response = await fetch(API_URL + 'getUserChar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ id }),
  });

  if (response.status === 200) {
    const json: CharacteristicsType = await response.json();
    return json;
  }

  return false;
};

export const getPhoto = async (id: number, token: string) => {
  const response = await fetch(API_URL + `download/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (response.status !== 200) {
    return null;
  }

  const blob = await response.blob();
  const base64 = await getBase64Url(blob);

  return `data:image/jpeg;base64,${base64}`;
};
