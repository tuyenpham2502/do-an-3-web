import { profileAtom } from '@/application/stores/atoms/global/profile';
import { useAtomValue } from 'jotai';

export const useGetProfile = () => {
  const profile = useAtomValue(profileAtom);

  return {
    profile,
    ...profile, // Spread the properties of the profile object
  };
};
