// Ekran głowny po zalogowaniu

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant="displaySmall" style={styles.shadow}>
          MY NEW HOMIE
        </Text>
        <Text variant="headlineSmall" style={styles.shadow}>
          NIE WAŻNE GDZIE, WAŻNE Z KIM
        </Text>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Search')}
      >
        Znajdź współlokatora
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadow: {
    textShadowColor: '#000',
    textShadowOffset: { height: 3, width: 1 },
    textShadowRadius: 10,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'rgb(21, 101, 192)',
  },
});
