import { NavigationContainer } from '@react-navigation/native';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

import { ChatContextProvider } from './providers/chat-provider/ChatProvider';
import { UserContextProvider } from './providers/user-provider/UserProvider';
import Layout from './screens/Layout';

// Plik wejściowy aplikacji

// Motyw aplikacji, kolory
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(21, 101, 192)',
    onPrimary: '#FFF',
    surfaceVariant: '#f0f0f0',
    secondary: '#FFF',
    onSecondary: 'rgb(21, 101, 192)',
  },
};

export default function App() {
  return (
    <UserContextProvider>
      <ChatContextProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Layout />
          </NavigationContainer>
        </PaperProvider>
      </ChatContextProvider>
    </UserContextProvider>
  );
}
