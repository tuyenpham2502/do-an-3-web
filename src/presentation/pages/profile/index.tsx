import { profileAtom } from '@/application/stores/atoms/global/profile';
import FullPageLoading from '@/presentation/components/commons/FullPageLoading';
import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { Separator } from '@/presentation/components/ui/separator';
import { useAtomValue } from 'jotai';

const ProfilePage = () => {
  const { data: profile, isLoading, isError } = useAtomValue(profileAtom);

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isError || !profile) {
    return (
      <div className='container mx-auto p-6 text-red-500'>
        Error loading profile or profile not found.
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>User Profile</h1>
      <Separator className='mb-6' />

      <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
        <div className='flex-shrink-0'>
          <Avatar className='w-32 h-32'>
            <AvatarImage
              src={profile.avatarUrl || '/public/icons/avatar-default.svg'}
              alt='User Avatar'
            />
            <AvatarFallback>{profile.name ? profile.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow w-full'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input id='fullName' value={profile.name || ''} readOnly />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' value={profile.email || ''} readOnly />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='role'>Role</Label>
            <Input id='role' value={profile.role || ''} readOnly />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='createdAt'>Member Since</Label>
            <Input
              id='createdAt'
              value={new Date(profile.createdAt).toLocaleDateString()}
              readOnly
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='updatedAt'>Last Updated</Label>
            <Input
              id='updatedAt'
              value={new Date(profile.updatedAt).toLocaleDateString()}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
