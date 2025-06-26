import { Button } from '@/presentation/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useResetPassword } from '@/presentation/hooks/auth/useResetPassword';
import { ResetPasswordFormData, formSchema } from '@/shared/schemas/auth/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword, isLoading } = useResetPassword();

  const form = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: token || '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({
      newPassword: data.password,
      token: data.token,
    });
  };

  if (!token) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm'>
          <p className='text-xl font-bold tracking-tight text-red-600 mb-4'>Invalid Reset Link</p>
          <p className='text-sm text-muted-foreground text-center'>
            This password reset link is invalid or has expired. Please request a new password reset
            link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm'>
        <p className='mt-4 text-xl font-bold tracking-tight mb-4'>Reset your password</p>
        <p className='text-sm text-muted-foreground mb-6'>Please enter your new password below</p>
        <Form {...form}>
          <form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your new password'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm your new password'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
