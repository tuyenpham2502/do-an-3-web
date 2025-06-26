import { useRepository } from '@/di/RepositoriesProvider';
import { AutoWarningSettings } from '@/domain/models/system-setting/auto-warning-setting';
import { useToast } from '../use-toast';

export const useUpdateAutoWarningSetting = () => {
  const { toast } = useToast(); // ✅ Lấy từ context
  const { systemSettingRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: updateAutoWaringSetting, ...rest } =
    systemSettingRepository.updateAutoWarningSetting();

  return {
    updateAutoWaringSetting: (relaySetting: AutoWarningSettings) => {
      updateAutoWaringSetting(relaySetting, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Auto warning settings updated successfully.',
          });
        },
      });
    },
    ...rest,
  };
};
