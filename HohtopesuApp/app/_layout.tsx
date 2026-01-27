import { Stack } from "expo-router";
import { theme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";

export default function RootLayout()
{
  return (
    <>
      {/*
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.headerBackground },
          headerTintColor: theme.colors.headerText,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
        >
        <Stack.Screen name="index"                options={{ headerShown: false }} />
        <Stack.Screen name="debug"                options={{ title: 'Debug' }} />
        <Stack.Screen name="login"                options={{ title: 'Kirjaudu Hohtopesuun' }} />
        <Stack.Screen name="map-screen"           options={{ title: 'Valitse pesula' }} />
        <Stack.Screen name="modal"                options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="now-washing"          options={{ headerShown: false }} />
        <Stack.Screen name="register"             options={{ title: 'Rekisteröidy' }} />
        <Stack.Screen name="wash-confirmation"    options={{ title: 'Valitse pesuohjelma' }} />
        <Stack.Screen name="carwash-confirmation" options={{ title: 'Vahvista pesula' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

