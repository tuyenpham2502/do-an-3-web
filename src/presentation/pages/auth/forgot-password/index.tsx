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
import { useForgotPassword } from '@/presentation/hooks/auth/useForgotPassword';
import { AppRoutes } from '@/shared/appRoutes';
import { formSchema } from '@/shared/schemas/auth/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const ForgotPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { forgotPassword, isPending } = useForgotPassword();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await forgotPassword({ email: data.email }).then(() => {
        setIsSuccess(true);
      });
    } catch (_error) {
      // Handle error if needed, e.g., show a toast notification
    }
  };

  if (isSuccess) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm'>
          <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-green-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <p className='text-xl font-bold tracking-tight mb-4'>Check your email</p>
          <p className='text-sm text-muted-foreground mb-6 text-center'>
            We've sent a password reset link to your email address.
          </p>
          <Button asChild className='w-full'>
            <Link to={AppRoutes.PUBLIC.AUTH.LOGIN}>Return to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm'>
        <p className='mt-4 text-xl font-bold tracking-tight mb-4'>Reset your password</p>
        <p className='text-sm text-muted-foreground mb-6 text-center'>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <Form {...form}>
          <form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='Email' className='w-full' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit' className='w-full'>
              Send Reset Link
            </Button>
          </form>
        </Form>
        <div className='mt-5'>
          <Link
            to={AppRoutes.PUBLIC.AUTH.LOGIN}
            className='text-sm block underline text-muted-foreground text-center'
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
