import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import {
  setCharacteristicsActions,
  setPhotoAction,
  setUserInfoAction,
} from './actions';
import { Action, UserContextActionTypes, UserContextType } from './types';
import {
  getCharacteristics,
  getPhoto,
  getUserInfo,
  updateOnline,
} from './utils';

// Kontekst zawierający informacje o zalogowanym użytkowniku

// Stan startowy kontekstu
export const initialState: UserContextType = {
  userStatus: 'logged-out',
  token: '',
  username: '',
  userId: 0,
  firstname: '',
  lastname: '',
  gender: 'M',
  age: 0,
  phonenumber: '',
  description: '',
  still_looking: true,
  characteristics: null,
};

// Twrozenie kontekstu
export const UserContext = createContext<{
  state: UserContextType;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
}>({
  state: initialState,
  dispatch: () => null,
  isLoading: false,
});

// Funkcaj minipulująca stanem kontekstu zależnie od otrzymanej akcji
function userReducer(state: UserContextType, action: Action): UserContextType {
  switch (action.type) {
    case UserContextActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    case UserContextActionTypes.SET_USER_INFO:
      return {
        ...state,
        userStatus: 'logged-in',
        ...action.payload,
      };

    case UserContextActionTypes.SET_CHARACTERTISTICS:
      return {
        ...state,
        characteristics: action.payload,
      };

    case UserContextActionTypes.SET_PHOTO: {
      return {
        ...state,
        photo: action.payload,
      };
    }

    case UserContextActionTypes.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}

// Provider dla kontekstu
export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const intervalRef = useRef();

  useEffect(() => {
    (async () => {
      if (state.token) {
        setIsLoading(true);
        const userInfo = await getUserInfo(state.token);

        if (userInfo) {
          dispatch(setUserInfoAction(userInfo));
          const characteristics = await getCharacteristics(
            userInfo.userId,
            state.token
          );

          if (characteristics) {
            dispatch(setCharacteristicsActions(characteristics));
          }

          const photo = await getPhoto(userInfo.userId, state.token);

          if (photo) {
            dispatch(setPhotoAction(photo));
          }

          setInterval(() => {
            updateOnline(userInfo.username, state.token);
          }, 60000);
        }

        setIsLoading(false);
      }
    })();
  }, [state.token]);

  return (
    <UserContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// Funkcja pobierająca zawartość kontekstu
export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used inside a UserContextProvider');
  }

  return context;
}
