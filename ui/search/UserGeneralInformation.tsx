// Komponent wyświetlające ogólne informacje wyszukanego użytkownika

import { Image, StyleSheet, View } from 'react-native';
import { Badge, Button, List, MD3Colors, Text } from 'react-native-paper';

import { SpecificUserInfo } from '../../hooks/useGetSpecificUser';

export default function UserGeneralInformation({
  data,
  handleNewChat,
}: {
  data: SpecificUserInfo;
  handleNewChat: () => void;
}) {
  return (
    <View style={styles.userContainer}>
      <View style={styles.row}>
        <View>
          <Badge
            theme={{
              colors: {
                primary: data.searchDTO.online === true ? 'green' : 'red',
              },
            }}
          />
          {data.searchDTO.photo ? (
            <Image
              source={{
                uri: `data:image\\png;base64,${data.searchDTO.photo}`,
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
        <View>
          <Text variant="titleMedium">
            {data.searchDTO.firstname} {data.searchDTO.lastname}
          </Text>
          <Text variant="titleSmall">{data.searchDTO.age} lat</Text>
        </View>
      </View>

      <List.Item
        title={`Szukam mieszkania w:  ${data.characteristicsDTO.livesIn}`}
        left={() => (
          <List.Icon icon="home-city-outline" color={MD3Colors.neutral60} />
        )}
      />

      <List.Item
        title={
          data.characteristicsDTO.isStudent
            ? 'Jestem studentem'
            : 'Nie uczę się'
        }
        left={() => (
          <List.Icon icon="school-outline" color={MD3Colors.neutral60} />
        )}
      />

      <List.Item
        title={data.characteristicsDTO.works ? 'Pracuję' : 'Nie pracuję'}
        left={() => (
          <List.Icon icon="briefcase-outline" color={MD3Colors.neutral60} />
        )}
      />

      <List.Item
        title={
          data.characteristicsDTO.hasPets ? 'Mam zwierzęta' : 'Nie mam zwierząt'
        }
        left={() => (
          <List.Icon icon="paw-outline" color={MD3Colors.neutral60} />
        )}
      />

      <List.Item
        title={
          data.characteristicsDTO.smokes
            ? 'Palę papierosy'
            : 'Nie palę papierosów'
        }
        left={() => <List.Icon icon="smoking" color={MD3Colors.neutral60} />}
      />

      <List.Item
        title={
          data.characteristicsDTO.preferedGender === 'M'
            ? 'Płeć współlokatora: mężczyzna'
            : data.characteristicsDTO.preferedGender === 'K'
              ? 'Płeć współlokatora: kobieta'
              : 'Płeć współlokatora: nie mam preferencji'
        }
        left={() => (
          <List.Icon icon="account-outline" color={MD3Colors.neutral60} />
        )}
      />

      <List.Item
        title={
          data.characteristicsDTO.acceptsPets
            ? 'Akceptuje zwierzęta w mieszkaniu'
            : 'Nie akceptuje zwierząt w mieszkaniu'
        }
        left={() => (
          <List.Icon
            icon={
              data.characteristicsDTO.acceptsPets ? 'check-outline' : 'close'
            }
            color={MD3Colors.neutral60}
          />
        )}
      />

      {data.searchDTO.description ? (
        <>
          <Text variant="bodyLarge">Opis użytkownika: </Text>

          <Text variant="bodyMedium">{data.searchDTO.description}</Text>
        </>
      ) : (
        <Text variant="bodyLarge"> Brak opisu</Text>
      )}

      <Button
        mode="contained"
        style={{ alignSelf: 'center' }}
        onPress={() => handleNewChat()}
      >
        Napisz do mnie
      </Button>
    </View>
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
    padding: 10,
    gap: 5,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
