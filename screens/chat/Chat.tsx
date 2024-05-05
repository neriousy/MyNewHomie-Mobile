// Komponent z ekranem głownym zaraz po zalogowaniu

import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useChatContext } from '../../providers/chat-provider/ChatProvider';
import ChatRoomTile from '../../ui/chat/chat-room-tile/ChatRoomTile';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function Chat({ navigation }: Props) {
  const { state } = useChatContext();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {state.rooms.size > 0 &&
        Array.from(state.rooms.values()).map((room) => (
          <ChatRoomTile key={room.id} chatRoom={room} />
        ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    gap: 10,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
});
