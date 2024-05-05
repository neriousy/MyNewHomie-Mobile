export interface Message {
  messageId?: number;
  senderId: number;
  senderName?: string;
  receiverId: number;
  receiverName?: string;
  message: string;
  date: [number, number, number, number, number, number, number] | Date;
  unread?: boolean;
}

export interface SocketMessage {
  date: Date;
  message: string;
  receiverId: number;
  senderId: number;
}

export interface ChatRoom {
  id: number;
  name: string;
  photo: string | null;
  messages: Message[];
  online: boolean;
}

export interface ChatContextType {
  rooms: Map<number, ChatRoom>;
}

export enum ChatContextActionTypes {
  INIT = 'INIT',
  NEW_MESSAGE = 'NEW_MESSAGE',
  SEND_MESSAGE = 'SEND_MESSAGE',
  NEW_CHAT = '',
}

export interface ChatInitActionType {
  type: ChatContextActionTypes.INIT;
  payload: ChatRoom[];
}

export interface NewMessageActionType {
  type: ChatContextActionTypes.NEW_MESSAGE;
  payload: SocketMessage;
}

export interface SendMessageActionType {
  type: ChatContextActionTypes.SEND_MESSAGE;
  payload: SocketMessage;
}

export interface NewChatActionType {
  type: ChatContextActionTypes.NEW_CHAT;
  payload: ChatRoom;
}
export type ChatActions =
  | ChatInitActionType
  | NewMessageActionType
  | SendMessageActionType
  | NewChatActionType;
