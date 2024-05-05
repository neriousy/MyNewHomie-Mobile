// Komponent zawierający interfejs do konfiguracji preferencji w ekranie 'characteristics'

import { ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

import { CITIES, GENDERS } from '../../../lib/const';
import { CharacteristicsType } from '../../../providers/user-provider/types';
import StepButtons from '../step-buttons/StepButtons';

export default function CharacteristicsPreferences({
  traits,
  handleTraitChange,
}: {
  traits: CharacteristicsType;
  handleTraitChange: (value: any, name: keyof CharacteristicsType) => void;
}) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text variant="labelLarge">Miasto w którym szukam współlokatora</Text>
      <SelectDropdown
        data={CITIES}
        defaultValue={{ title: traits.livesIn }}
        onSelect={(selectedItem) =>
          handleTraitChange(selectedItem.title, 'livesIn')
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

      <Text variant="labelLarge">Preferowana płeć współlokatora</Text>

      <SelectDropdown
        defaultValue={GENDERS.find(
          // eslint-disable-next-line prettier/prettier
          (gender) => gender.value === traits.preferedGender
        )}
        data={GENDERS}
        onSelect={(selectedItem) =>
          handleTraitChange(selectedItem.value, 'preferedGender')
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

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.acceptsPets === 1 ? 'checked' : 'unchecked'}
          onPress={() =>
            handleTraitChange(traits.acceptsPets === 1 ? 0 : 1, 'acceptsPets')
          }
        />
        <Text variant="labelLarge">Akceptuje zwierzęta w mieszkaniu</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.acceptsSmoking === 1 ? 'checked' : 'unchecked'}
          onPress={() =>
            handleTraitChange(
              traits.acceptsSmoking === 1 ? 0 : 1,
              'acceptsSmoking'
            )
          }
        />
        <Text variant="labelLarge">Akceptuje palenie papierosów</Text>
      </View>
      <StepButtons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 10,
    backgroundColor: '#fff',
  },

  scrollView: {
    flexGrow: 1,
    width: '100%',
  },

  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
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
    backgroundColor: '#d8d8d8',
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
});
