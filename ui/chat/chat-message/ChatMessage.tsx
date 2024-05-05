import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Message } from '../../../providers/chat-provider/types';
import { Badge, Text } from 'react-native-paper';
import { useUserContext } from '../../../providers/user-provider/UserProvider';

export default function ChatMessage({
  message,
  isLastInRow,
  photo,
}: {
  message: Message;
  isLastInRow: boolean;
  photo: string | null;
}) {
  const { state } = useUserContext();

  const isMyMessage = message.senderId === state.userId;
  const showProfilePicture = isLastInRow && !isMyMessage;

  return (
    <View style={isMyMessage ? styles.rowRight : styles.rowLeft}>
      {showProfilePicture && (
        <View style={styles.profilePictureContainer}>
          {photo ? (
            <Image
              source={{
                uri: `data:image\\png;base64,${photo}`,
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
      )}
      <View
        style={[
          styles.messageContainer,
          isMyMessage
            ? styles.myMessageContainer
            : styles.senderMessageContainer,
          !showProfilePicture && styles.noProfilePicturePadding,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isMyMessage ? styles.myMessageText : styles.senderMessageText,
          ]}
        >
          {message.message}
        </Text>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    maxWidth: screenWidth / 2,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  myMessageContainer: {
    backgroundColor: 'rgb(21, 101, 192)',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  senderMessageContainer: {
    backgroundColor: 'rgb(234, 235, 237)',
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff', // Default text color
    maxWidth: '100%', // Allow text wrapping
  },
  myMessageText: {
    color: '#fff',
  },
  senderMessageText: {
    color: '#000',
  },

  profilePictureContainer: {
    width: 40,
    marginRight: 5, // Add some space between the profile picture and message
  },

  profilePicture: {
    borderRadius: 30,
    height: 30,
    width: 30,
  },

  rowLeft: {
    flexDirection: 'row',
    gap: 0,
    alignSelf: 'flex-start',
  },

  rowRight: {
    alignSelf: 'flex-end',
  },

  noProfilePicturePadding: {
    marginLeft: 45,
  },
});
