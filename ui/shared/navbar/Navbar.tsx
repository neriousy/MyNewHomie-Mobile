import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';

import { useUserContext } from '../../../providers/user-provider/UserProvider';
import { signOutAction } from '../../../providers/user-provider/actions';
import { RootStackParamList } from '../../../screens/Layout';

// Komponent z navbarem dla ekranu home

export default function NavHeader({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  const { dispatch } = useUserContext();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <View style={styles.column}>
            <Ionicons name="person-outline" size={30} color="black" />
            <Text>Mój profil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.column}>
            <Ionicons name="chatbubble-outline" size={30} color="black" />
            <Text>Czat</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => dispatch(signOutAction())}>
        <MaterialIcons name="logout" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    left: 0,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: StatusBar.currentHeight ?? 0 + 10,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  column: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
