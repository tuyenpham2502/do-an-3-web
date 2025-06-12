import { User } from '@/domain/models/Auth';
import { atomWithReset } from 'jotai/utils';

export const profileAtom = atomWithReset<User>({
  id: null,
  email: null,
  name: null,
  role: null,
});
