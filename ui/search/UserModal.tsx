// Modal wyświetlający szczegóły wyszukane użytkownika

import { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';

import UserFlat from './UserFlat';
import UserGeneralInformation from './UserGeneralInformation';
import UserTraits from './UserTraits';
import useGetSpecificUser from '../../hooks/useGetSpecificUser';
import { useChatContext } from '../../providers/chat-provider/ChatProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../screens/Layout';
import { newChatAction } from '../../providers/chat-provider/actions';

export default function UserModal({
  visible,
  onDismiss,
  userId,
}: {
  visible: boolean;
  onDismiss: () => void;
  userId: number;
}) {
  const containerStyle = {
    backgroundColor: 'white',
    flexGrow: 1,
  };
  const { getSpecificUser, data, status } = useGetSpecificUser();
  const { dispatch } = useChatContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getSpecificUser(userId);
  }, [userId]);

  const handleNewChat = useCallback(() => {
    console.log('hnadling');

    if (data) {
      dispatch(
        newChatAction({
          id: userId,
          messages: [],
          name: `${data?.searchDTO.firstname} ${data?.searchDTO.lastname}`,
          online: data?.searchDTO.online,
          photo: data?.searchDTO.photo,
        })
      );

      onDismiss();

      navigation.navigate('ChatRoom', { id: userId });
    }
  }, [data, userId]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}
        dismissableBackButton
        style={{}}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          {(status === 'loading' || status === 'default') && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator />
            </View>
          )}

          {status === 'success' && data && (
            <TabsProvider defaultIndex={0}>
              <Tabs>
                <TabScreen label="Ogólne informacje">
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                  >
                    <UserGeneralInformation
                      data={data}
                      handleNewChat={handleNewChat}
                    />
                  </ScrollView>
                </TabScreen>
                <TabScreen label="Cechy">
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                  >
                    <UserTraits data={data} />
                  </ScrollView>
                </TabScreen>
                <TabScreen label="Mieszkanie">
                  <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                  >
                    <UserFlat data={data} />
                  </ScrollView>
                </TabScreen>
              </Tabs>
            </TabsProvider>
          )}
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },

  userContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: '100%',
    gap: 10,
    justifyContent: 'flex-start',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
});
