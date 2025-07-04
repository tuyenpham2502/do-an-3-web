import { Setting } from '@/domain/models/system-setting/system-setting';
import { atomWithReset } from 'jotai/utils';

export const settingAtom = atomWithReset<Setting>({
  autoWarning: false,
  isPumpOn: false,
});
