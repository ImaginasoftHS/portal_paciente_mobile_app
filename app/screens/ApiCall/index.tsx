import { View,Text, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery } from 'react-query';
import { fetchUserData } from '../../api/api';
import { useRecoilValue } from 'recoil';
import { authTokenState } from '../../store/authState';
import { GetIdToken } from "../../api/awsAuth";
import { useEffect } from "react";

/** chamo o react query/ */

/* map do objeto de retorno*/

export function ApiCallScreen(){
    const userData = useRecoilValue(authTokenState);

    const { data, error, isLoading } = useQuery(['userData', userData], () => fetchUserData(userData), {
      //enabled: !!userData, // Apenas executa a query se o token estiver disponível
    });
  
    if (isLoading) {
      return <ActivityIndicator />;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    const result = GetIdToken();
    console.log(result);

    return (
      <View style={styles.container}>
        <Text variant="titleLarge">User Data  </Text>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
  });
  