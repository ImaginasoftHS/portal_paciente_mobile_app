import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { AuthTokenState } from "../../store/AuthState";
import { getPatient } from "../../api/getpatient";

/** chamo o react query/ */

/* map do objeto de retorno*/

export default function DashboardScreen() {
  const [userToken, setUserToken] = useRecoilState(AuthTokenState);

  //const result = GetIdToken();

  const { data, error, isLoading } = useQuery(
    ["userData", userToken.isAuthenticated],
    () => getPatient(userToken.user),
    {
      enabled: !!userToken.isAuthenticated, // Apenas executa a query se o token estiver disponível
    }
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log("erro");

    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>User Data</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
