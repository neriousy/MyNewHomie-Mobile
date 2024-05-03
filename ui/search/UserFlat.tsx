import { StyleSheet, View } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';

import { SpecificUserInfo } from '../../hooks/useGetSpecificUser';

export default function UserFlat({ data }: { data: SpecificUserInfo }) {
  const searchOption = [
    'Szukam współlokatora oddzielnego pokoju w mieszkaniu',
    'Szukam współlokatora do wspóldzielonego pokoju w mieszkaniu',
    'Szukam współlokatora z preferencją oddzielnych pokoi',
    'Szukam współlokatora z preferencją wspóldzielonych pokoi',
  ];

  return (
    <View style={styles.userContainer}>
      <List.Item
        title={searchOption[data.flatDTO.searchOption]}
        left={() => (
          <List.Icon icon="home-outline" color={MD3Colors.neutral60} />
        )}
        titleNumberOfLines={2}
      />

      <List.Item
        title={
          data.flatDTO.searchOption === 0 || data.flatDTO.searchOption === 1
            ? 'Aktualna liczba współlookatorów: ' + data.flatDTO.numberOfPeople
            : 'Preferowana liczba współlookatorów: ' +
              data.flatDTO.numberOfPeople
        }
        left={() => (
          <List.Icon icon="account-multiple" color={MD3Colors.neutral60} />
        )}
        titleNumberOfLines={2}
      />

      <List.Item
        title={
          data.flatDTO.searchOption === 0 || data.flatDTO.searchOption === 1
            ? 'Liczba pokoi: ' + data.flatDTO.searchOption
            : 'Preferowana liczba pokoi: ' + data.flatDTO.searchOption
        }
        left={() => <List.Icon icon="pound" color={MD3Colors.neutral60} />}
        titleNumberOfLines={2}
      />

      {(data.flatDTO.searchOption === 0 || data.flatDTO.searchOption === 1) && (
        <List.Item
          title={'Opis mieszkania: ' + data.flatDTO.description}
          left={() => (
            <List.Icon icon="note-text-outline" color={MD3Colors.neutral60} />
          )}
          titleNumberOfLines={9}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
