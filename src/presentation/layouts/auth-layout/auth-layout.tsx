import { cn } from '@/shared/utils';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='grid min-h-svh bg-background lg:grid-cols-5'>
        <div className='flex flex-col justify-center items-center h-full col-span-2'>
          <div className={cn('flex flex-col gap-6 w-full max-w-[600px] px-6 md:px-10')}>
            {children}
          </div>
        </div>
        <div className='relative hidden lg:block col-span-3 p-4 '>
          <img
            src='/images/auth-bg.jpg'
            alt='Login'
            className='object-cover object-center w-full h-full rounded-lg'
          />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
