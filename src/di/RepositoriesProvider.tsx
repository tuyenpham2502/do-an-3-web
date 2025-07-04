import { AuthRepositoryImpl } from '@/infrastructure/repositories/AuthRepositoryImpl';
import { ProfileRepositoryImpl } from '@/infrastructure/repositories/ProfileRepositoryImpl';
import { ReadingRepositoryImpl } from '@/infrastructure/repositories/ReadingRepositoryImpl';
import { SystemSettingRepositoryImpl } from '@/infrastructure/repositories/SystemSettingRepositoryImpl';
import { UserRepositoryImpl } from '@/infrastructure/repositories/UserRepositoryImpl';
import { ReactNode, createContext, useContext, useMemo } from 'react';

// 1. Định nghĩa interface cho repositories
export interface RepositoryContainer {
  authRepository: ReturnType<typeof AuthRepositoryImpl>;
  userRepository: ReturnType<typeof UserRepositoryImpl>;
  profileRepository: ReturnType<typeof ProfileRepositoryImpl>; // Optional if you have a profile repository
  systemSettingRepository: ReturnType<typeof SystemSettingRepositoryImpl>; // Optional if you have a profile repository
  readingsRepository: ReturnType<typeof ReadingRepositoryImpl>; // Optional if you have a readings repository
}

// 2. Tạo context với kiểu rõ ràng
const RepositoryContext = createContext<RepositoryContainer | undefined>(undefined);

// 3. Định nghĩa props cho Provider
interface RepositoryProviderProps {
  children: ReactNode;
}

// 4. Triển khai Provider
export const RepositoryProvider = ({ children }: RepositoryProviderProps) => {
  const repositories = useMemo<RepositoryContainer>(
    () => ({
      authRepository: AuthRepositoryImpl(),
      userRepository: UserRepositoryImpl(),
      profileRepository: ProfileRepositoryImpl(), // Optional, can be removed if not needed
      systemSettingRepository: SystemSettingRepositoryImpl(), // Optional, can be removed if not needed
      readingsRepository: ReadingRepositoryImpl(), // Optional, can be removed if not needed
    }),
    []
  );

  return <RepositoryContext.Provider value={repositories}>{children}</RepositoryContext.Provider>;
};

// 5. Tạo custom hook
export const useRepository = (): RepositoryContainer => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
};
