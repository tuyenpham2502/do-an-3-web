import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/presentation/components/ui/alert-dialog';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { useCreateUser } from '@/presentation/hooks/users/useCreateUser';
import { Constants } from '@/shared/constants';
import { AddUserSchema, addUserSchema } from '@/shared/schemas/user/addUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export default function AddUserModal({ open, onClose, onSubmit }: AddUserModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
    defaultValues: { email: '', name: '', role: '' },
  });
  const { createUser } = useCreateUser();

  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleFormSubmit = async (data: AddUserSchema) => {
    try {
      await createUser(data);
      if (onSubmit) onSubmit();
      onClose();
    } catch (_) {
      // Optionally handle error, e.g., show a toast or set error state
      // toast.error("Failed to create user");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className='flex items-center gap-2'>Add New User</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <Label className='mb-1 block'>Email</Label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    placeholder='Enter email address'
                    aria-invalid={!!errors.email}
                  />
                )}
              />
              {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}
            </div>
            <div>
              <Label className='mb-1 block'>Name</Label>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    placeholder='Enter full name'
                    aria-invalid={!!errors.name}
                  />
                )}
              />
              {errors.name && <span className='text-xs text-red-500'>{errors.name.message}</span>}
            </div>
            <div>
              <Label className='mb-1 block'>Role</Label>
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select role' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Constants.ROLES).map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <span className='text-xs text-red-500'>{errors.role.message}</span>}
            </div>
          </div>
          <div className='flex justify-end gap-2 pt-2'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Create User</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
