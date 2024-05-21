import { Auth } from 'aws-amplify';

export const login = async (username: string, password: string) => {
  try {
    const session = await Auth.currentSession()
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
    return session.getAccessToken().getJwtToken()
  } catch (error) {
    console.error('Error getting ID token:', error)
    return null
  }

};