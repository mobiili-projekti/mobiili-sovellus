import { Stack } from "expo-router";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout()
{
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

