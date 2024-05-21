import { Auth } from 'aws-amplify';

export const login = async (username: string, password: string) => {
  const user = await Auth.signIn(username, password);
  console.log(user)
  return user.signInUserSession.idToken.jwtToken;
};