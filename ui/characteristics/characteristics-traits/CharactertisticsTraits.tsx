// Interfejs umożliwiający konfiguracje cech użytkownika na ekranie 'characteristics'

import { ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { CharacteristicsType } from '../../../providers/user-provider/types';
import CharacteristicsSlider from '../characteristics-slider/CharacteristicsSlider';
import StepButtons from '../step-buttons/StepButtons';

export default function CharacteristicsTraits({
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
      <CharacteristicsSlider
        name="Osobowość"
        trait="characterType"
        value={traits.characterType}
        marks={['Introwertyk', 'Ekstrawertyk']}
        setValue={handleTraitChange}
      />
      <CharacteristicsSlider
        trait="sleepTime"
        name="Chodzę spać"
        value={traits.sleepTime}
        marks={['Wcześnie', 'Późno']}
        setValue={handleTraitChange}
      />
      <CharacteristicsSlider
        trait="conciliatory"
        name="Gdy pojawia się problem"
        value={traits.conciliatory}
        marks={['Ugodowy', 'Konfliktowy']}
        setValue={handleTraitChange}
      />
      <CharacteristicsSlider
        trait="cooking"
        name="Gotowanie"
        value={traits.cooking}
        marks={['Rzadko', 'Często']}
        setValue={handleTraitChange}
      />
      <CharacteristicsSlider
        trait="invitingFriends"
        name="Zapraszam znajomych"
        value={traits.invitingFriends}
        marks={['Rzadko', 'Często']}
        setValue={handleTraitChange}
      />
      <CharacteristicsSlider
        trait="talkativity"
        name="Rozmawiam z innymi"
        value={traits.talkativity}
        marks={['Rzadko', 'Często']}
        setValue={handleTraitChange}
      />
      <CharacteristicsSlider
        trait="timeSpentOutsideHome"
        name="Wychodzę z mieszkania"
        value={traits.timeSpentOutsideHome}
        marks={['Rzadko', 'Często']}
        setValue={handleTraitChange}
      />

      <Text variant="titleMedium">Dodatkowe informacje</Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.isStudent === 1 ? 'checked' : 'unchecked'}
          onPress={() =>
            handleTraitChange(traits.isStudent === 1 ? 0 : 1, 'isStudent')
          }
        />
        <Text variant="labelLarge">Jestem studentem</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.works === 1 ? 'checked' : 'unchecked'}
          onPress={() => handleTraitChange(traits.works === 1 ? 0 : 1, 'works')}
        />
        <Text variant="labelLarge">Pracuje</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.smokes === 1 ? 'checked' : 'unchecked'}
          onPress={() =>
            handleTraitChange(traits.smokes === 1 ? 0 : 1, 'smokes')
          }
        />
        <Text variant="labelLarge">Palę papierosy</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.drinks === 1 ? 'checked' : 'unchecked'}
          onPress={() =>
            handleTraitChange(traits.drinks === 1 ? 0 : 1, 'drinks')
          }
        />
        <Text variant="labelLarge">Piję alkohol</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={traits.hasPets === 1 ? 'checked' : 'unchecked'}
          onPress={() =>
            handleTraitChange(traits.hasPets === 1 ? 0 : 1, 'hasPets')
          }
        />
        <Text variant="labelLarge">Mam zwierzęta</Text>
      </View>
      <StepButtons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    gap: 5,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
  containerScrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
