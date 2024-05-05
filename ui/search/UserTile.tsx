// Komponent kafelek który jest pojedynczym wynikiem wyszukiwania

import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, View } from 'react-native';
import { Badge, Button, Divider, Text } from 'react-native-paper';

import { UserSearch } from '../../hooks/useSearch';

export default function UserTile({
  data,
  openModal,
}: {
  data: UserSearch;
  openModal: (data: number) => void;
}) {
  return (
    <View style={styles.container}>
      <Badge
        theme={{
          colors: { primary: data.online === true ? 'green' : 'red' },
        }}
      />
      {data.photo ? (
        <Image
          source={{
            uri: `data:image\\png;base64,${data.photo}`,
          }}
          style={styles.profilePicture}
        />
      ) : (
        <Image
          source={require('../../assets/temp-profile.png')}
          style={styles.profilePicture}
        />
      )}

      <Text variant="labelLarge">{data.firstname}</Text>

      <Text variant="labelMedium"> {data.age} lat</Text>

      <Divider />

      <Button style={styles.button} onPress={() => openModal(data.id)}>
        Zobacz profil <Ionicons name="arrow-forward" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '45%',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    elevation: 10,
    gap: 5,
    padding: 10,
  },

  profilePicture: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },

  profilePicturePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    borderRadius: 100,
    height: 100,
    width: 100,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
