// Główny plik zawierający logike nawigacji

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import { useUserContext } from '../providers/user-provider/UserProvider';
import Characteristics from './characteristics/Characteristics';
import MyProfile from './my-profile/MyProfile';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { signOutAction } from '../providers/user-provider/actions';
import { MaterialIcons } from '@expo/vector-icons';
import Search from './search/Search';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Characteristics: undefined;
  MyProfile: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Layout() {
  const { state, isLoading, dispatch } = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        state.userStatus === 'logged-in'
          ? state.characteristics !== null
            ? 'Home'
            : 'Characteristics'
          : 'Login'
      }
    >
      {state.userStatus === 'logged-in' && state.characteristics !== null && (
        <>
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{
              headerLeft: () => {
                return (
                  <View style={styles.rowContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('MyProfile')}
                    >
                      <View style={styles.rowContainer}>
                        <Ionicons
                          name="person-outline"
                          size={30}
                          color="black"
                        />
                        <Text>Mój profil</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Home')}
                    >
                      <View style={styles.rowContainer}>
                        <Ionicons
                          name="chatbubble-outline"
                          size={30}
                          color="black"
                        />
                        <Text>Czat</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              },
              headerTitle: '',

              headerRight: () => {
                return (
                  <TouchableOpacity onPress={() => dispatch(signOutAction())}>
                    <MaterialIcons name="logout" size={30} color="black" />
                  </TouchableOpacity>
                );
              },
            }}
          />

          <Stack.Screen
            name={'MyProfile'}
            component={MyProfile}
            options={{
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <View style={styles.rowContainer}>
                      <Icon source={'arrow-left'} size={16} />
                      <Text variant="labelLarge">Strona główna</Text>
                    </View>
                  </TouchableOpacity>
                );
              },
              headerRight: () => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Characteristics')}
                  >
                    <View style={styles.rowContainer}>
                      <Text variant="labelLarge">Cechy</Text>
                      <Icon source={'account-edit'} size={26} />
                    </View>
                  </TouchableOpacity>
                );
              },

              headerTitle: '',
            }}
          />

          <Stack.Screen
            name={'Search'}
            component={Search}
            options={{
              headerTitle: 'Wyszukiwarka',
            }}
          />
        </>
      )}

      {state.userStatus === 'logged-in' && (
        <Stack.Screen
          name={'Characteristics'}
          component={Characteristics}
          options={{
            headerTitle: '',
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyProfile')}
                >
                  <View style={styles.rowContainer}>
                    <Icon source={'arrow-left'} size={16} />
                    <Text variant="labelLarge">Mój profil</Text>
                  </View>
                </TouchableOpacity>
              );
            },
          }}
        />
      )}

      {state.userStatus === 'logged-out' && (
        <>
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'Register'}
            component={Register}
            options={{
              title: 'Rejestracja',
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  column: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
