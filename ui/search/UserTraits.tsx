import { StyleSheet, View } from 'react-native';

import { SpecificUserInfo } from '../../hooks/useGetSpecificUser';
import CharacteristicsSlider from '../characteristics/characteristics-slider/CharacteristicsSlider';

export default function UserTraits({ data }: { data: SpecificUserInfo }) {
  return (
    <View style={styles.container}>
      <CharacteristicsSlider
        name="Osobowość"
        trait="characterType"
        value={data.characteristicsDTO.characterType}
        marks={['Introwertyk', 'Ekstrawertyk']}
        disabled
      />
      <CharacteristicsSlider
        trait="sleepTime"
        name="Chodzę spać"
        value={data.characteristicsDTO.sleepTime}
        marks={['Wcześnie', 'Późno']}
        disabled
      />
      <CharacteristicsSlider
        trait="conciliatory"
        name="Gdy pojawia się problem"
        value={data.characteristicsDTO.conciliatory}
        marks={['Ugodowy', 'Konfliktowy']}
        disabled
      />
      <CharacteristicsSlider
        trait="cooking"
        name="Gotowanie"
        value={data.characteristicsDTO.cooking}
        marks={['Rzadko', 'Często']}
        disabled
      />
      <CharacteristicsSlider
        trait="invitingFriends"
        name="Zapraszam znajomych"
        value={data.characteristicsDTO.invitingFriends}
        marks={['Rzadko', 'Często']}
        disabled
      />
      <CharacteristicsSlider
        trait="talkativity"
        name="Rozmawiam z innymi"
        value={data.characteristicsDTO.talkativity}
        marks={['Rzadko', 'Często']}
        disabled
      />
      <CharacteristicsSlider
        trait="timeSpentOutsideHome"
        name="Wychodzę z mieszkania"
        value={data.characteristicsDTO.timeSpentOutsideHome}
        marks={['Rzadko', 'Często']}
        disabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: 'flex-start',
    padding: 10,
  },
});
