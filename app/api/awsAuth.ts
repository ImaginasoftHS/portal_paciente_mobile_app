import { Auth } from 'aws-amplify';
import { useRecoilState } from 'recoil';
import { authTokenState } from '../store/authState';

export const login = async (username: string, password: string) => {
  try {
    const session = await Auth.currentSession()
    const user = await Auth.currentAuthenticatedUser()
    return session.getAccessToken().getJwtToken()
  } catch (error) {
    console.error('Error getting ID token:', error)
    return null
  }

};