import * as React from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useMutation } from 'react-query';
import { useRouter } from 'expo-router';
import { login } from '../../api/awsAuth';
import { setAuthToken } from '../../api/api';

export function HomeScreen(){
 
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const theme = useTheme();
  const router = useRouter();

  const mutation = useMutation(
    (credentials: { username: string; password: string }) => 
      login(credentials.username, credentials.password),
    {
      onSuccess: (token) => {
        // Set the auth token for future requests
        setAuthToken(token);
        // Redirecionar para a página após o login bem-sucedido
        //router.push('/home');
      },
      onError: (error) => {
        Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
      }
    }
  );
  const handleLogin = () => {
    // Handle login logic
    console.log('Username:', username);
    console.log('Password:', password);
    mutation.mutate({ username, password });
  };

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

