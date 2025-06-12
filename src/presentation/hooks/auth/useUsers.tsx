import { useRepository } from '@/di/RepositoriesProvider';

export const useUsers = () => {
  const { userRepository } = useRepository();
  const result = userRepository.getUsers();

  return {
    users: result.data,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
  };
};
