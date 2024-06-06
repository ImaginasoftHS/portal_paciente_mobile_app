import { Auth } from 'aws-amplify';
import { atom } from 'recoil';

export interface AuthState {
  isAuthenticated: boolean;
  user: Object | null;
}

export const AuthTokenState = atom<AuthState>({
  key: 'AuthTokenState', // unique ID (with respect to other atoms/selectors)
  default: {
    isAuthenticated: false,
    user: null
  }, 
  effects: [
    ({ setSelf }) => {
      const fetchAuthUser = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          setSelf((prevState)=>({
            isAuthenticated: true,
            user
          }))
        } catch (error) {
          setSelf((prevState)=>({
            isAuthenticated: false,
            user: null
          }))
        }
      };

      fetchAuthUser();
    },
  ],
});