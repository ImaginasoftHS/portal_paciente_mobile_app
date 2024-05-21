
import { StyleSheet} from 'react-native';
import { Provider as PaperProvider , MD3DarkTheme as DefaultTheme} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainTabs from './app/components/tabs';
import theme from './app/theme';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './app/aws-exports';
import { QueryClientProvider } from 'react-query';
import queryClient from './app/navigation/queryClient';
import { RecoilRoot } from 'recoil';


Amplify.configure(amplifyconfig);
export default function App() {


  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <MainTabs />
          </NavigationContainer>
        </PaperProvider>
        </QueryClientProvider>
    </RecoilRoot>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
