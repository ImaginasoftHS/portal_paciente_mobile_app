import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'expo-router';
import { useRecoilState } from 'recoil';
import { AuthTokenState } from '../../store/AuthState';

import { Auth } from 'aws-amplify';
import { getClinic } from '../../api/getClinic';

export default function HomeScreen() {

  const [username, setUsername] = useState<string>('joaosantos@imaginasoft.pt');
  const [password, setPassword] = useState<string>('Imagina2022!');
  const [userAuth, setUserAuth] = useRecoilState(AuthTokenState);
  
  const theme = useTheme();
  const router = useRouter();
  
  const { data, error, isLoading } = useQuery(['userData', userAuth], () => getClinic(), {
    enabled: !!userAuth.isAuthenticated, // Apenas executa a query se o token estiver disponível
    onSuccess: () => {
      // Redirect to another page on successful data fetch
      router.navigate('/(tabs)/dashboard'); // Replace '/nextpage' with your target page route
    }
  });
  
  
  const handleLogin = async () => {
    // Handle login logic
    var user = await Auth.signIn({ password, username })
    setUserAuth(user)
    
  };
  
    
  const handleLogout = async () => {
    // Handle Sign out
    await Auth.signOut();
  };
  
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log("erro");

    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button} color={theme.colors.primary}>
        Login
      </Button>
      <Button mode="contained" onPress={handleLogout} style={styles.button} color={theme.colors.secondary}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

