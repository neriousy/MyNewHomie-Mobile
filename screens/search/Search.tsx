// Komponent z wyszukiwarką użytkowników

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Text, TextInput, Title } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

import useSearch, { SearchParams } from '../../hooks/useSearch';
import { CITIES, GENDERS } from '../../lib/const';
import UserModal from '../../ui/search/UserModal';
import UserTile from '../../ui/search/UserTile';

export default function Search() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    age_from: 18,
    age_to: 100,
    city: '',
    gender: 'O',
    ifDrinkingAlc: false,
    ifSmoking: false,
    ifStudent: false,
    ifWorking: false,
  });
  const [userModalVisible, setUserModalVisible] = useState<boolean>(false);
  const [userId, setUserModalData] = useState<number>(0);

  const dismissModal = () => setUserModalVisible(false);
  const openUserModal = (data: number) => {
    setUserModalData(data);
    setUserModalVisible(true);
  };

  const { status, data, search } = useSearch();

  const handleChangeParams = (value: any, name: keyof SearchParams) => {
    setSearchParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSearch = async () => {
    await search(searchParams);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Title
        style={{
          fontWeight: 'bold',
        }}
      >
        Wyszukaj współlokatora
      </Title>
      <Divider />

      <View>
        <Text>Miasto</Text>
        <SelectDropdown
          data={CITIES}
          onSelect={(selectedItem) =>
            handleChangeParams(selectedItem.title, 'city')
          }
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Wybierz miasto'}
                </Text>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#c9c9c9' }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          mode="outlined"
          style={styles.ageInput}
          inputMode="numeric"
          label="Wiek od"
          onChangeText={(val) => handleChangeParams(val, 'age_from')}
        />

        <TextInput
          mode="outlined"
          style={styles.ageInput}
          inputMode="numeric"
          label="Wiek do"
          onChangeText={(val) => handleChangeParams(val, 'age_to')}
        />
      </View>

      <View>
        <Text>Płeć</Text>
        <SelectDropdown
          data={GENDERS}
          defaultValue={{
            title: 'Obojętnie',
            value: 'O',
          }}
          onSelect={(selectedItem) =>
            handleChangeParams(selectedItem.value, 'gender')
          }
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) ||
                    'Wybierz preferowaną płeć współlokatora'}
                </Text>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#c9c9c9' }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>

      <Button
        mode="contained"
        disabled={status === 'loading' || searchParams.city === ''}
        onPress={() => handleSearch()}
      >
        Szukaj
      </Button>

      {data.length > 0 && status === 'success' && (
        <View style={styles.dataContainer}>
          {data.map((user) => {
            return (
              <UserTile data={user} key={user.id} openModal={openUserModal} />
            );
          })}
        </View>
      )}

      <StatusBar style="auto" />

      <UserModal
        visible={userModalVisible}
        onDismiss={dismissModal}
        userId={userId}
      />
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
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBlockColor: '#c9c9c9',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  ageInput: {
    flex: 1,
  },

  dataContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
