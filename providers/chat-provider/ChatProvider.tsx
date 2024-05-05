import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import * as Stomp from 'react-native-stompjs';
import SockJS from 'sockjs-client';

import { SOCKET_URL } from '../../lib/const';
import { useUserContext } from '../user-provider/UserProvider';
import useGetChatMessages from '../../hooks/useGetChatMessages';
import {
  ChatActions,
  ChatContextActionTypes,
  ChatContextType,
  ChatRoom,
  SocketMessage,
} from './types';
import { chatInitAction, newMessageAction, sendMessageAction } from './actions';
import { EventManager } from '../../lib/event-handling/events';

const initialState: ChatContextType = {
  rooms: new Map<number, ChatRoom>(),
};

type ConnectionType = 'disconnected' | 'connecting' | 'connected';

export const ChatContext = createContext<{
  state: ChatContextType;
  dispatch: React.Dispatch<ChatActions>;
  isLoading: boolean;
  isConnected: ConnectionType;
  getChatRoomByUserId: (id: number) => ChatRoom | null;
  sendNewMessage: (message: SocketMessage) => void;
}>({
  state: initialState,
  dispatch: () => null,
  isLoading: false,
  isConnected: 'disconnected',
  getChatRoomByUserId: () => null,
  sendNewMessage: () => null,
});

function chatReducer(
  state: ChatContextType,
  action: ChatActions
): ChatContextType {
  switch (action.type) {
    case ChatContextActionTypes.INIT:
      const map = new Map<number, ChatRoom>();

      action.payload.forEach((room) => {
        map.set(room.id, room);
      });

      return {
        rooms: map,
      };

    case ChatContextActionTypes.NEW_MESSAGE:
      const room = state.rooms.get(action.payload.senderId);

      if (!room) {
        return state;
      }

      const updatedMessages = [
        ...room.messages,
        {
          date: action.payload.date,
          message: action.payload.message,
          receiverId: action.payload.receiverId,
          senderId: action.payload.senderId,
        },
      ];

      const updatedRoom = {
        ...room,
        messages: updatedMessages,
      };

      const updatedRooms = new Map(state.rooms);
      updatedRooms.set(action.payload.senderId, updatedRoom);

      setTimeout(() => {
        EventManager.dispatchEvent('NEW_MESSAGE');
      }, 100);

      return {
        ...state,
        rooms: updatedRooms,
      };

    case ChatContextActionTypes.SEND_MESSAGE:
      const receiverRoom = state.rooms.get(action.payload.receiverId);

      if (!receiverRoom) {
        return state;
      }

      const updatedReceiverMessages = [
        ...receiverRoom.messages,
        action.payload,
      ];

      const updatedReceiverRoom = {
        ...receiverRoom,
        messages: updatedReceiverMessages,
      };

      const updatedReceiverRooms = new Map(state.rooms);
      updatedReceiverRooms.set(action.payload.receiverId, updatedReceiverRoom);

      return {
        ...state,
        rooms: updatedReceiverRooms,
      };

    case ChatContextActionTypes.NEW_CHAT:
      const roomsWithNewChat = state.rooms;

      roomsWithNewChat.set(action.payload.id, action.payload);

      return {
        ...state,
        rooms: roomsWithNewChat,
      };
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
  const [isConnected, setIsConnected] =
    useState<ConnectionType>('disconnected');
  const { state: userState } = useUserContext();
  const [client, setClient] = useState<Stomp.Client>();
  let socketInstance;
  let stompClient: Stomp.Client;

  const onConnected = (stompClient: Stomp.Client) => {
    setIsConnected('connected');

    stompClient.subscribe(`/user/${userState.userId}/private`, (message) => {
      try {
        const newMessage = JSON.parse(message.body);
        if (newMessage.senderId) {
          dispatch(newMessageAction(newMessage));
        }
      } catch {}
    });
  };

  const onError = () => {
    setIsConnected('disconnected');
  };

  const { getChatMessages } = useGetChatMessages();

  const initChat = async (id: number) => {
    const chatRooms = await getChatMessages(id);

    dispatch(chatInitAction(chatRooms));
  };

  useEffect(() => {
    if (userState.userStatus === 'logged-in') {
      (async () => {
        setIsLoading(true);
        setIsConnected('connecting');
        socketInstance = new SockJS(SOCKET_URL);
        stompClient = Stomp.over(socketInstance);
        stompClient.connect({}, () => onConnected(stompClient), onError);
        setClient(stompClient);
        await initChat(userState.userId);

        setIsLoading(false);
      })();
    }
  }, [userState.userStatus]);

  const getChatRoomByUserId = (id: number) => {
    const room = state.rooms.get(id);

    if (room) {
      return room;
    }

    return null;
  };

  const sendNewMessage = (message: SocketMessage) => {
    if (isConnected === 'connected' && client) {
      client.send('/app/private-chat', {}, JSON.stringify(message));
      dispatch(sendMessageAction(message));
    }
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        isConnected,
        getChatRoomByUserId,
        sendNewMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used inside a ChatContextProvider');
  }

  return context;
}
