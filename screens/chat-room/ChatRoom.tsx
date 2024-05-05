// Komponent z ekranem głownym zaraz po zalogowaniu

import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TextInput as NativeInput,
} from 'react-native';
import { RootStackParamList } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useChatContext } from '../../providers/chat-provider/ChatProvider';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../ui/shared/loader/Loader';
import {
  Badge,
  Divider,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import ChatMessage from '../../ui/chat/chat-message/ChatMessage';
import { useUserContext } from '../../providers/user-provider/UserProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;

export default function ChatRoom({ route }: Props) {
  const { id } = route.params;

  const [input, setInput] = useState<string>('');
  const { state, isConnected, isLoading, sendNewMessage } = useChatContext();
  const [room, setRoom] = useState(state.rooms.get(id));
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [visibleHeight, setVisibleHeight] = useState(0);
  const inputRef = useRef<NativeInput>(null);
  const { state: userState } = useUserContext();

  useEffect(() => {
    setRoom(state.rooms.get(id));
  }, [state]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const handleLayout = () => {
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef.current.measure((x, y, width, height) => {
        setVisibleHeight(height);
      });
    }
  };

  const handleNewData = (w: number, h: number) => {
    if (h - scrollPosition - visibleHeight < 60) {
      scrollToBottom();
    }
  };

  const handleSendNewMessage = (message: string) => {
    if (!message) {
      return;
    }

    sendNewMessage({
      date: new Date(),
      message: message,
      receiverId: id,
      senderId: userState.userId,
    });

    setInput('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  if (isLoading || isConnected === 'connecting') {
    return <Loader />;
  }

  if (isConnected === 'disconnected') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Stracono połączenie z serwerem</Text>
      </View>
    );
  }

  if (!room) {
    return (
      <View>
        <Text>Nie udało się pobrać pokoju</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        padding: 10,
        gap: 5,
      }}
    >
      <View style={styles.row}>
        <View
          style={{
            width: 40,
          }}
        >
          <Badge
            theme={{
              colors: { primary: room.online === true ? 'green' : 'red' },
            }}
            size={10}
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
            }}
          />
          {room.photo ? (
            <Image
              source={{
                uri: `data:image\\png;base64,${room.photo}`,
              }}
              style={styles.profilePicture}
            />
          ) : (
            <Image
              source={require('../../assets/temp-profile.png')}
              style={styles.profilePicture}
            />
          )}
        </View>

        <Text variant="labelLarge">{room.name}</Text>
      </View>

      <Divider />

      <ScrollView
        ref={scrollViewRef}
        onLayout={handleLayout}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        onContentSizeChange={(w, h) => handleNewData(w, h)}
        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
      >
        {room.messages.map((message, index) => {
          return (
            <ChatMessage
              photo={room.photo}
              message={message}
              key={index}
              isLastInRow={
                index === room.messages.length - 1 ||
                message.senderId !== room.messages[index + 1].senderId
              }
            />
          );
        })}
        <StatusBar style="auto" />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          mode="outlined"
          style={{ flexGrow: 1 }}
          value={input}
          onChangeText={(e) => setInput(e)}
        />
        <IconButton
          icon={'send-outline'}
          mode="contained"
          onPress={() => handleSendNewMessage(input)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    gap: 5,
  },
  scrollView: {
    width: '100%',
    flexGrow: 1,
  },

  profilePicture: {
    borderRadius: 75,
    height: 40,
    width: 40,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
