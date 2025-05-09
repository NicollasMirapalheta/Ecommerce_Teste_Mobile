import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '@/contexts/cartContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack initialRouteName="(screens)/index">
          <Stack.Screen name="(screens)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)/home" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)/products" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)/shoppingCart" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CartProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
