// Komponent z formularzem do zmiany danych użytkownika

import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {
  Button,
  Checkbox,
  Divider,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import useSavePhoto from '../../hooks/useSavePhoto';
import useSaveUserInfo from '../../hooks/useSaveUserInfo';
import { useUserContext } from '../../providers/user-provider/UserProvider';
import { setPhotoAction } from '../../providers/user-provider/actions';
import { UserInfo } from '../../providers/user-provider/types';
import SelectDropdown from 'react-native-select-dropdown';
import { GENDERS, MY_GENDERS } from '../../lib/const';
import { KeyboardShift } from '../../ui/shared/keyboard-shift/KeyboardShift';

export default function MyProfile() {
  const { state, dispatch } = useUserContext();
  const { saveUserInfo, status, message, setStatus } = useSaveUserInfo();
  const { savePhoto } = useSavePhoto();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: state.age,
    description: state.description,
    firstname: state.firstname,
    gender: state.gender,
    lastname: state.lastname,
    phonenumber: state.phonenumber,
    still_looking: state.still_looking,
    userId: state.userId,
    username: state.username,
  });

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0]) {
        const res = await savePhoto(result.assets[0]);

        if (res) {
          dispatch(setPhotoAction(result.assets[0].uri));
        }
      }
    }
  };

  const handleUserInfoChange = (value: any, name: keyof UserInfo) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <KeyboardShift>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <Text variant="titleLarge">Mój profil</Text>
        <Divider />
        <TouchableOpacity
          onPress={handlePickImage}
          style={styles.photoContainer}
        >
          {state?.photo ? (
            <Image
              source={{
                uri: state.photo,
              }}
              style={styles.profilePicture}
            />
          ) : (
            <>
              <View style={styles.profilePicturePlaceholder}>
                <Image
                  source={require('../../assets/temp-profile.png')}
                  style={styles.profilePicture}
                />
              </View>
              <Text>Dodaj zdjęcie profilowe</Text>
            </>
          )}
        </TouchableOpacity>
        <TextInput
          mode="outlined"
          label="Imie"
          value={userInfo.firstname}
          onChangeText={(value) => handleUserInfoChange(value, 'firstname')}
        />

        <TextInput
          mode="outlined"
          label="Nazwisko"
          value={userInfo.lastname}
          onChangeText={(value) => handleUserInfoChange(value, 'lastname')}
        />

        <TextInput
          mode="outlined"
          label="Numer telefonu"
          keyboardType="numeric"
          value={userInfo.phonenumber}
          onChangeText={(value) => handleUserInfoChange(value, 'phonenumber')}
        />

        <View style={styles.row}>
          <TextInput
            mode="outlined"
            label="Wiek"
            keyboardType="numeric"
            value={userInfo.age.toString()}
            onChangeText={(value) => handleUserInfoChange(value, 'age')}
          />

          <View style={{ flexGrow: 1 }}>
            <Text variant="labelSmall"> Płeć</Text>
            <SelectDropdown
              data={MY_GENDERS}
              defaultValue={{
                title: 'Inna',
                value: 'O',
              }}
              onSelect={(selectedItem) =>
                handleUserInfoChange(selectedItem.value, 'gender')
              }
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        'Wybierz preferowaną płeć współlokatora'}
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
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>

        <TextInput
          mode="outlined"
          label="Opisz się"
          value={userInfo.description}
          multiline
          numberOfLines={4}
          onChangeText={(value) => handleUserInfoChange(value, 'description')}
        />
        <View style={styles.row}>
          <Text>Nadal szukam współlokatora</Text>
          <Checkbox
            status={userInfo.still_looking === true ? 'checked' : 'unchecked'}
            onPress={() =>
              handleUserInfoChange(!userInfo.still_looking, 'still_looking')
            }
          />
        </View>
        <Button
          mode="contained"
          onPress={() => saveUserInfo(userInfo)}
          disabled={status === 'loading'}
        >
          Zapisz zmiany
        </Button>

        <Snackbar
          visible={status === 'error' || status === 'success'}
          onDismiss={() => setStatus('default')}
          action={{
            label: 'Schowaj',
            onPress: () => {
              setStatus('default');
            },
          }}
          style={{ alignSelf: 'center', width: '100%' }}
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
      </ScrollView>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    gap: 10,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
  profilePicture: {
    borderRadius: 75,
    height: 150,
    width: 150,
  },

  profilePicturePlaceholder: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 75,
    height: 150,
    justifyContent: 'center',
    width: 125,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
  },

  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownButtonStyle: {
    flexGrow: 1,
    height: 50,
    backgroundColor: '#fff',
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
    backgroundColor: '#f0f0f0',
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
