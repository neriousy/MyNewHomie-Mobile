// Logika do przesłania nowego zdjęcia profilowego użytkownika

import { useState } from 'react';
import { FormStatus } from '../screens/types';
import { API_URL } from '../lib/const';
import { useUserContext } from '../providers/user-provider/UserProvider';
import { ImagePickerAsset } from 'expo-image-picker';

export default function useSavePhoto() {
  const [status, setStatus] = useState<FormStatus>('default');
  const [message, setMessage] = useState<string>('');
  const {
    state: { token, userId },
  } = useUserContext();

  const savePhoto = async (photo: ImagePickerAsset) => {
    setStatus('loading');

    try {
      const formData = new FormData();

      // @ts-ignore
      formData.append('image', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      formData.append('id', userId.toString());

      const response = await fetch(API_URL + `upload`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        setStatus('success');
        setMessage('Dane zostały zapisane pomyślnie');
        return true;
      } else {
        setMessage('Wystąpił błąd');
        setStatus('error');
        return false;
      }
    } catch (e) {
      setMessage('Wystąpił błąd');
      setStatus('error');
      return false;
    }
  };

  return {
    status,
    savePhoto,
    setStatus,
    message,
  };
}
