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
import { useLogin } from '@/presentation/hooks/auth/useLogin';
import { AppRoutes } from '@/shared/appRoutes';
import { formSchema } from '@/shared/schemas/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const LoginPage = () => {
  const { login, isPending } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm'>
        <p className='mt-4 text-xl font-bold tracking-tight mb-4'>Log in to plant care system</p>
        <p className='text-sm text-muted-foreground mb-6'>
          Enter your email and password to continue
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Password' className='w-full' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-4 w-full' disabled={isPending}>
              Continue with Email
            </Button>
          </form>
        </Form>
        <div className='mt-5 space-y-5'>
          <Link
            to={AppRoutes.PUBLIC.AUTH.FORGOT_PASSWORD}
            className='text-sm block underline text-muted-foreground text-center'
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
