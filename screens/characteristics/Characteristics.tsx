// Komponent umożliwiający konfiguracje charakterystyk zalogowanego użytkownika

import { ScrollView, StyleSheet } from 'react-native';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import { useUserContext } from '../../providers/user-provider/UserProvider';
import { useState } from 'react';
import { CharacteristicsType } from '../../providers/user-provider/types';
import CharacteristicsTraits from '../../ui/characteristics/characteristics-traits/CharactertisticsTraits';
import CharacteristicsPreferences from '../../ui/characteristics/characteristics-preferences/CharacteristicsPreferences';
import Flat from '../../ui/characteristics/flat/Flat';

export default function Characteristics() {
  const {
    state: { characteristics, userId },
  } = useUserContext();
  const [traits, setTraits] = useState<CharacteristicsType>(
    characteristics !== null
      ? characteristics
      : {
          acceptsPets: 0,
          acceptsSmoking: 0,
          characterType: 3,
          conciliatory: 3,
          cooking: 3,
          description: '',
          drinks: 0,
          hasFlat: false,
          hasPets: 0,
          invitingFriends: 3,
          isStudent: 0,
          latitude: 0,
          likesPets: 3,
          livesIn: 'Toruń',
          longitude: 0,
          numberOfPeople: 1,
          numberOfRooms: 1,
          preferedGender: 'O',
          searchOption: 0,
          sleepTime: 3,
          smokes: 0,
          talkativity: 3,
          timeSpentOutsideHome: 3,
          userId,
          works: 0,
        }
  );

  const handleTraitChange = (value: any, name: keyof CharacteristicsType) => {
    setTraits((prevTraits) => {
      return {
        ...prevTraits,
        [name]: value,
      };
    });
  };

  return (
    <TabsProvider defaultIndex={0}>
      <Tabs>
        <TabScreen label="O mnie">
          <CharacteristicsTraits
            traits={traits}
            handleTraitChange={handleTraitChange}
          />
        </TabScreen>
        <TabScreen label="Preferencje">
          <CharacteristicsPreferences
            traits={traits}
            handleTraitChange={handleTraitChange}
          />
        </TabScreen>
        <TabScreen label="Mieszkanie">
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
          >
            <Flat traits={traits} handleTraitChange={handleTraitChange} />
          </ScrollView>
        </TabScreen>
      </Tabs>
    </TabsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    gap: 10,
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
});
