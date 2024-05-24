import { useState,useEffect } from 'react'; 
import { View, StyleSheet,Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useMutation } from 'react-query';
import { useRouter } from 'expo-router';
//import { login } from '../../api/awsAuth';
//import { setGetPatient } from '../../api/api';
import { useRecoilState } from 'recoil';
import { authTokenState } from '../../store/authState';
import { Auth } from 'aws-amplify';

export function HomeScreen(){
  
  const [username, setUsername] = useState<string>('joaosantos@imaginasoft.pt');
  const [password, setPassword] = useState<string>('Imagina2022!');
  const theme = useTheme();
  const router = useRouter();
  const [userAuth, setUserAuth] = useRecoilState(authTokenState);

  //console.log(userAuth?.email);


  
  const handleLogin = async() => {
    // Handle login logic
    var user = await Auth.signIn({password,username})
    //console.log(user);
  };

  const handleLogout = async() => {
    // Handle Sign out
    await Auth.signOut();
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

