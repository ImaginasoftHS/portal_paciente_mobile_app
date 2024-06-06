import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../aws-exports';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import queryClient from '../components/navigation/queryClient';
import {theme} from '../components/theme';
import { View,Text } from 'react-native';
Amplify.configure(amplifyconfig);

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

    <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </PaperProvider>
          </QueryClientProvider>
      </RecoilRoot>
  );
}
