import { Auth } from 'aws-amplify';

export const GetIdToken = async ()=>{
  try {
    const session = await Auth.currentSession()
    const user = await Auth.currentAuthenticatedUser()
    console.log(user);
    
    //console.log(session.getAccessToken().getJwtToken())
    return await session.getAccessToken().getJwtToken()
  } catch (error) {
    console.error('Error getting ID token:', error)
    return null
  }
}