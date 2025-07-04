import { useRepository } from '@/di/RepositoriesProvider';
import { SystemSetting } from '@/domain/models/system-setting/system-setting';
import { useToast } from '../use-toast';

export const useUpdateSystemSetting = () => {
  const { toast } = useToast(); // ✅ Lấy từ context
  const { systemSettingRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: updateSystemSetting, ...rest } = systemSettingRepository.updateSystemSetting();

  return {
    updateSystemSetting: (systemSetting: SystemSetting) => {
      updateSystemSetting(systemSetting, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'System settings updated successfully.',
          });
        },
      });
    },
    ...rest,
  };
};
