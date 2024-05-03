import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import { useTabIndex, useTabNavigation } from 'react-native-paper-tabs';

import useSaveCharacteristics from '../../../hooks/useSaveCharacteristics';
import { CharacteristicsType } from '../../../providers/user-provider/types';

export default function StepButtons({
  traits,
}: {
  traits?: CharacteristicsType;
}) {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  const { saveCharacteristics, status, setStatus, message } =
    useSaveCharacteristics();

  const handleSaveTraits = () => {
    if (traits) {
      saveCharacteristics(traits);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Button
          mode="elevated"
          disabled={index === 0}
          onPress={() => goTo(index - 1)}
        >
          Wstecz
        </Button>

        {(index === 0 || index === 1) && (
          <Button mode="contained" onPress={() => goTo(index + 1)}>
            Dalej
          </Button>
        )}

        {index === 2 && (
          <Button mode="contained" onPress={() => handleSaveTraits()}>
            Zapisz
          </Button>
        )}
      </View>
      <Snackbar
        visible={status === 'error' || status === 'success'}
        onDismiss={() => setStatus('default')}
        action={{
          label: 'Schowaj',
          onPress: () => {
            setStatus('default');
          },
        }}
      >
        {(status === 'error' || status === 'success') && (
          <Text
            style={{
              color: 'white',
            }}
          >
            {message}
          </Text>
        )}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
