import {
  ChatContextActionTypes,
  ChatInitActionType,
  ChatRoom,
  NewChatActionType,
  NewMessageActionType,
  SendMessageActionType,
  SocketMessage,
} from './types';

export function chatInitAction(payload: ChatRoom[]): ChatInitActionType {
  return {
    type: ChatContextActionTypes.INIT,
    payload,
  };
}

export function newMessageAction(payload: SocketMessage): NewMessageActionType {
  return {
    type: ChatContextActionTypes.NEW_MESSAGE,
    payload,
  };
}

export function sendMessageAction(
  payload: SocketMessage
): SendMessageActionType {
  return {
    type: ChatContextActionTypes.SEND_MESSAGE,
    payload,
  };
}

export function newChatAction(payload: ChatRoom): NewChatActionType {
  return {
    type: ChatContextActionTypes.NEW_CHAT,
    payload,
  };
}
