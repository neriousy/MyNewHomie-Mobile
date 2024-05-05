import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ChatRoom } from '../../../providers/chat-provider/types';
import { Badge, Divider, Text } from 'react-native-paper';
import { useUserContext } from '../../../providers/user-provider/UserProvider';
import LastMessageDate from './LastMessageDate';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../screens/Layout';

export default function ChatRoomTile({ chatRoom }: { chatRoom: ChatRoom }) {
  const lastMessage = chatRoom.messages[chatRoom.messages.length - 1];
  const { state } = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatRoom', { id: chatRoom.id })}
        style={styles.row}
      >
        <View
          style={{
            width: 75,
          }}
        >
          <Badge
            theme={{
              colors: { primary: chatRoom.online === true ? 'green' : 'red' },
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
            }}
          />
          {chatRoom.photo ? (
            <Image
              source={{
                uri: `data:image\\png;base64,${chatRoom.photo}`,
              }}
              style={styles.profilePicture}
            />
          ) : (
            <Image
              source={require('../../../assets/temp-profile.png')}
              style={styles.profilePicture}
            />
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text variant="labelLarge">{chatRoom.name}</Text>

          <View style={styles.lastMessagecontainer}>
            {lastMessage && (
              <>
                <Text>
                  {lastMessage.senderId === state.userId && 'Ty: '}
                  {lastMessage.message}
                </Text>

                <LastMessageDate date={lastMessage.date} />
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },

  profilePicture: {
    borderRadius: 75,
    height: 75,
    width: 75,
  },

  infoContainer: {
    flexGrow: 1,
    padding: 5,
    justifyContent: 'space-between',
  },

  lastMessagecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
