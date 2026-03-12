import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlurrColors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const FlurrTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: FlurrColors.cream,
    card: FlurrColors.white,
    text: FlurrColors.black,
    primary: FlurrColors.coral,
  },
};

export const unstable_settings = {
  anchor: '(auth)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Benguiat-Book': require('../assets/fonts/ITCBenguiatStdBookCn.otf'),
    'Benguiat-BookItalic': require('../assets/fonts/ITCBenguiatStdBookCnIt.otf'),
    'Benguiat-Medium': require('../assets/fonts/ITCBenguiatStdMediumCn.otf'),
    'Benguiat-MediumItalic': require('../assets/fonts/ITCBenguiatStdMediumCnIt.otf'),
    'Benguiat-Bold': require('../assets/fonts/ITCBenguiatStdBoldCn.otf'),
    'Benguiat-BoldItalic': require('../assets/fonts/ITCBenguiatStdBoldCnIt.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={FlurrTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
