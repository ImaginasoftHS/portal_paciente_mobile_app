import 'core-js/full/promise/finally'
import 'core-js/full/symbol/async-iterator'
import { AppRegistry,Text,StatusBar,StyleSheet} from 'react-native';
import { Provider as PaperProvider , MD3DarkTheme as DefaultTheme} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './src/components/tabs';
import theme from './src/theme';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/aws-exports';
import { QueryClientProvider } from 'react-query';
import queryClient from './src/navigation/queryClient';

Amplify.configure(amplifyconfig);
export default function App() {
  const Stack = createStackNavigator();


  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </PaperProvider>
      </QueryClientProvider>


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
