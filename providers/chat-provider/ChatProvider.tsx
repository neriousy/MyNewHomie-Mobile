import { createContext, useEffect, useReducer, useState } from 'react';
import * as Stomp from 'react-native-stompjs';
import SockJS from 'sockjs-client';

import { SOCKET_URL } from '../../lib/const';
import { useUserContext } from '../user-provider/UserProvider';

const initialState = {};

type ConnectionType = 'disconnected' | 'connecting' | 'connected';

export const ChatContext = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
  isLoading: boolean;
}>({
  state: '',
  dispatch: () => null,
  isLoading: false,
});

function chatReducer(state: any, action: any): any {
  switch (action.type) {
    default:
      return state;
  }
}

export function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket>();
  const [isConnected, setIsConnected] =
    useState<ConnectionType>('disconnected');
  const { state: userState } = useUserContext();

  const onConnected = (stompClient: any) => {
    setIsConnected('connected');

    stompClient.subscribe(`/user/${userState.userId}/private`, (message) => {
      const newMessage = JSON.parse(message.body);
      console.log({ newMessage });
    });
  };

  const onError = (error) => {
    setIsConnected('disconnected');
  };

  useEffect(() => {
    let socketInstance;
    let stompClient;
    if (userState.userStatus === 'logged-in') {
      setIsConnected('connecting');
      socketInstance = new SockJS(SOCKET_URL);

      stompClient = Stomp.over(socketInstance);
      stompClient.connect({}, () => onConnected(stompClient), onError); // Handle connection events
    }
  }, [userState.userStatus]);

  console.log(isConnected);
  return (
    <ChatContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}
