// Interfejs umożliwiający konfiguracje cech użytkownika opisujących mieszkanie na ekranie 'characteristics'

import { StyleSheet, View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';

import WithFlatOptions from './WithFlatOptions';
import WithoutFlatOptions from './WithoutFlatOptions';
import { CharacteristicsType } from '../../../providers/user-provider/types';
import StepButtons from '../step-buttons/StepButtons';

export default function Flat({
  traits,
  handleTraitChange,
}: {
  traits: CharacteristicsType;
  handleTraitChange: (value: any, name: keyof CharacteristicsType) => void;
}) {
  return (
    <>
      <Text variant="labelLarge">Mam mieszkanie</Text>

      <View style={styles.rowContainer}>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="false"
            status={traits.hasFlat === false ? 'checked' : 'unchecked'}
            onPress={() => {
              handleTraitChange(false, 'hasFlat');
              handleTraitChange(2, 'searchOption');
            }}
          />
          <Text variant="labelLarge">Nie</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="true"
            status={traits.hasFlat === true ? 'checked' : 'unchecked'}
            onPress={() => {
              handleTraitChange(true, 'hasFlat');
              handleTraitChange(1, 'searchOption');
            }}
          />
          <Text variant="labelLarge">Tak</Text>
        </View>
      </View>
      <Divider />

      {traits.hasFlat === false && (
        <WithoutFlatOptions
          traits={traits}
          handleTraitChange={handleTraitChange}
        />
      )}

      {traits.hasFlat === true && (
        <WithFlatOptions
          traits={traits}
          handleTraitChange={handleTraitChange}
        />
      )}

      <StepButtons traits={traits} />
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
});
