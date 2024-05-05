// Komponent służący do wyświetlania stanu ładowania

import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function Loader() {
  return (
    <View style={styles.container} testID="loader-container">
      <ActivityIndicator testID="loading-indicator" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
