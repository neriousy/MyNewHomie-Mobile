// Funkcje pomocnicze dla kontekstu

import {
  CharacteristicsType,
  SetCharacteristicsAction,
  SetPhotoAction,
  SetTokenAction,
  SetUserInfoAction,
  SignInAction,
  SignOutAction,
  UserContextActionTypes,
  UserInfo,
} from './types';

export function signInAction(payload: any): SignInAction {
  return {
    type: UserContextActionTypes.SIGN_IN,
    payload,
  };
}

export function signOutAction(): SignOutAction {
  return {
    type: UserContextActionTypes.SIGN_OUT,
  };
}

export function setTokenAction(payload: { token: string }): SetTokenAction {
  return {
    type: UserContextActionTypes.SET_TOKEN,
    payload,
  };
}

export function setUserInfoAction(payload: UserInfo): SetUserInfoAction {
  return {
    type: UserContextActionTypes.SET_USER_INFO,
    payload,
  };
}

export function setCharacteristicsActions(
  payload: CharacteristicsType
): SetCharacteristicsAction {
  return {
    type: UserContextActionTypes.SET_CHARACTERTISTICS,
    payload,
  };
}

export function setPhotoAction(payload: string): SetPhotoAction {
  return {
    type: UserContextActionTypes.SET_PHOTO,
    payload,
  };
}
