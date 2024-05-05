// Dodatkowe komponenty wyświetlające się kiedy użytkownik ma mieszkanie

import { StyleSheet, View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

import { CharacteristicsType } from '../../../providers/user-provider/types';

export default function WithoutFlatOptions({
  traits,
  handleTraitChange,
}: {
  traits: CharacteristicsType;
  handleTraitChange: (value: any, name: keyof CharacteristicsType) => void;
}) {
  const amountOfPeople = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
  ];

  return (
    <>
      <Text variant="labelLarge">Jakiego pokoju szukam</Text>
      <View style={styles.rowContainer}>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="2"
            status={traits.searchOption === 2 ? 'checked' : 'unchecked'}
            onPress={() => {
              handleTraitChange(2, 'searchOption');
            }}
          />
          <Text variant="labelLarge">Oddzielnego</Text>
        </View>

        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="3"
            status={traits.searchOption === 3 ? 'checked' : 'unchecked'}
            onPress={() => {
              handleTraitChange(3, 'searchOption');
            }}
          />
          <Text variant="labelLarge">Wspóldzielonego</Text>
        </View>
      </View>
      <Divider />
      <Text variant="labelLarge">
        Preferowana liczba współlokatorów w mieszkaniu
      </Text>

      <SelectDropdown
        data={amountOfPeople}
        defaultValue={{ value: traits.numberOfPeople }}
        onSelect={(selectedItem) =>
          handleTraitChange(selectedItem.value, 'numberOfPeople')
        }
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.value) ||
                  'Wybierz preferowaną liczbe ludzi'}
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
              <Text style={styles.dropdownItemTxtStyle}>{item.value}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
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
