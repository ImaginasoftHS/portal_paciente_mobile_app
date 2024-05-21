import { Auth } from 'aws-amplify';
import { atom } from 'recoil';

export const authTokenState = atom<Object | null>({
  key: 'authTokenState', // unique ID (with respect to other atoms/selectors)
  default: null, 
  effects: [
    ({ setSelf }) => {
      const fetchAuthUser = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          setSelf(user.attributes)
        } catch (error) {
          console.error('Failed to fetch authenticated user:', error);
        }
      };

      fetchAuthUser();
    },
  ],
});