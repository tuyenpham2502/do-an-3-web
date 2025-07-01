import { useRepository } from '@/di/RepositoriesProvider';
import { useToast } from '../use-toast';

export const useCreateUser = () => {
  const { toast } = useToast(); // ✅ Lấy từ context
  const { userRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: createUser, ...rest } = userRepository.createUser();

  return {
    createUser: (credentials: any) => {
      createUser(credentials, {
        onSuccess: () => {
          toast({
            title: 'Create user successful',
            description: 'User has been created successfully.',
          });
        },
      });
    },
    ...rest,
  };
};
