import { atomWithReset } from 'jotai/utils';
interface Profile {
  username: string;
  email: string;
  id: string | null;
  address: string | null;
  avatar: string | null;
  dob: Date | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  roles: any[];
}

export const profileAtom = atomWithReset<Profile>({
  username: '',
  email: '',
  id: null,
  address: null,
  avatar: null,
  dob: null,
  firstName: '',
  lastName: '',
  phone: '',
  roles: [
    {
      role: '',
    },
  ],
});
