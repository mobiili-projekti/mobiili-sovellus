import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

/*
export const unstable_settings = {
  anchor: '(tabs)',
};
*/

// Ohitin (tabs) kokonaan, siellä oli templatella luodut infot.
// laitoin toistaiseksi titlen jokaiselle sivulle, niin näkee millä sivulla on.

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/*
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="debug" options={{ title: 'Debug' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="map" options={{ title: 'Map' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="now-washing" options={{ title: 'Now-Washing' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="wash-confirmation" options={{ title: 'Wash-Confirmation' }} />
        <Stack.Screen name="carwash-confirmation" options={{ title: 'Carwash-Confirmation' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
