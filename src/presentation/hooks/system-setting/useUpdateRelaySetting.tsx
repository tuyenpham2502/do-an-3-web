import { useRepository } from '@/di/RepositoriesProvider';
import { RelaySettings } from '@/domain/models/system-setting/relay-settings';
import { useToast } from '../use-toast';

export const useUpdateRelaySetting = () => {
  const { toast } = useToast(); // ✅ Lấy từ context
  const { systemSettingRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: updateRelaySetting, ...rest } = systemSettingRepository.updateReplaySetting();

  return {
    updateRelaySetting: (relaySetting: RelaySettings) => {
      updateRelaySetting(relaySetting, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Relay settings updated successfully.',
          });
        },
      });
    },
    ...rest,
  };
};
