// Typy dla kontekstu

export type Gender = 'M' | 'K' | 'O';

export interface UserContextType {
  userStatus: 'logged-in' | 'logged-out';
  token: string;
  userId: number;
  firstname: string;
  lastname: string;
  username: string;
  age: number;
  gender: Gender;
  phonenumber: string;
  description: string;
  still_looking: boolean;
  characteristics: CharacteristicsType | null;
  photo?: string;
}

export interface CharacteristicsType {
  acceptsPets: 0 | 1;
  acceptsSmoking: 0 | 1;
  characterType: number;
  conciliatory: number;
  cooking: number;
  description: '';
  drinks: 0 | 1;
  hasFlat: boolean;
  hasPets: 0 | 1;
  invitingFriends: number;
  isStudent: 0 | 1;
  latitude: number;
  likesPets: number;
  livesIn: string;
  longitude: number;
  numberOfPeople: number;
  numberOfRooms: number;
  preferedGender: Gender;
  searchOption: number;
  sleepTime: number;
  smokes: 0 | 1;
  talkativity: number;
  timeSpentOutsideHome: number;
  userId: number;
  works: 0 | 1;
}

export enum UserContextActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SET_TOKEN = 'SET_TOKEN',
  SET_USER_INFO = 'SET_USER_INFO',
  SET_CHARACTERTISTICS = 'SET_CHARACTERISTICS',
  SET_PHOTO = 'SET_PHOTO',
}

export interface SignInAction {
  type: UserContextActionTypes.SIGN_IN;
  payload: any;
}

export interface SignOutAction {
  type: UserContextActionTypes.SIGN_OUT;
}

export interface SetTokenAction {
  type: UserContextActionTypes.SET_TOKEN;
  payload: {
    token: string;
  };
}

export interface UserInfo {
  userId: number;
  firstname: string;
  lastname: string;
  username: string;
  age: number;
  gender: Gender;
  phonenumber: string;
  description: string;
  still_looking: boolean;
}

export interface SetUserInfoAction {
  type: UserContextActionTypes.SET_USER_INFO;
  payload: UserInfo;
}

export interface SetCharacteristicsAction {
  type: UserContextActionTypes.SET_CHARACTERTISTICS;
  payload: CharacteristicsType;
}

export interface SetPhotoAction {
  type: UserContextActionTypes.SET_PHOTO;
  payload: string;
}

export type Action =
  | SignInAction
  | SignOutAction
  | SetTokenAction
  | SetUserInfoAction
  | SetCharacteristicsAction
  | SetPhotoAction;
