import { Badge } from '@/presentation/components/ui/badge';
import { Button } from '@/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';
import { Column, Table } from '@/presentation/components/ui/table';
import { useGetUser } from '@/presentation/hooks/users/useGetUsers';
import { AlertCircle, MoreHorizontal, Plus, Search } from 'lucide-react';
import * as React from 'react';
import AddUserModal from './AddUserModal';

const columns: Column<any>[] = [
  {
    header: 'ID',
    accessor: 'id',
    cell: (value) => <span className='text-sm font-medium text-muted-foreground'>{value}</span>,
  },
  {
    header: 'Email',
    accessor: 'email',
    cell: (value) => <span className='text-sm font-medium'>{value}</span>,
  },
  {
    header: 'Name',
    accessor: 'name',
    cell: (value) => <span className='text-sm font-semibold'>{value}</span>,
  },
  {
    header: 'Role',
    accessor: 'role',
    cell: (value) => <span className='text-sm'>{value}</span>,
  },
  {
    header: 'Created At',
    accessor: 'createdAt',
    cell: (value) => <span className='text-sm text-muted-foreground'>{value}</span>,
  },
  {
    header: 'Updated At',
    accessor: 'updatedAt',
    cell: (value) => <span className='text-sm text-muted-foreground'>{value}</span>,
  },
];

const UsersPage = () => {
  // Use API data from useGetUser
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useGetUser({
    page: 1, // Default to page 1, can be changed later
    limit: 10, // Default limit, can be adjusted
  });
  // Defensive: Only use apiData if it's an array, otherwise fallback to []
  const data: any[] = Array.isArray(apiData?.data) ? apiData?.data : [];
  // No filter, use all data directly
  const filteredData = Array.isArray(data) ? data : [];

  const userCount = filteredData.length;
  const totalUsers = Array.isArray(data) ? data.length : 0;

  // Modal state for AddUserModal
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddUser = () => {
    setAddModalOpen(false);
    refetch(); // Refetch users after adding a new user
  };

  if (error) {
    return (
      <div className='container mx-auto p-6 flex items-center justify-center min-h-screen'>
        <Card className='w-full max-w-md'>
          <CardContent className='pt-6'>
            <div className='flex flex-col items-center text-center space-y-4'>
              <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center'>
                <AlertCircle className='w-8 h-8 text-destructive' />
              </div>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>Error Loading Users</h3>
                <p className='text-sm text-muted-foreground'>
                  Unable to fetch user data. Please try again later.
                </p>
              </div>
              <Button variant='outline' onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 space-y-8 min-h-screen flex flex-col'>
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tight'>Users Management</h1>
          <p className='text-lg text-muted-foreground'>
            Manage and monitor all users in your system
          </p>
          <div className='flex items-center gap-4 pt-2'>
            <Badge variant='secondary' className='gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
              {totalUsers} total users
            </Badge>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Button size='lg' className='gap-2' onClick={() => setAddModalOpen(true)}>
            <Plus className='w-4 h-4' />
            Add New User
          </Button>
        </div>
      </div>
      {/* AddUserModal for adding new users */}
      <AddUserModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      {/* Main Content */}
      {isLoading ? (
        <Card className='flex-1 flex flex-col min-h-0'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-center py-12'>
              <div className='flex flex-col items-center gap-4'>
                <div className='animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent'></div>
                <p className='text-muted-foreground'>Loading users...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : filteredData.length === 0 && totalUsers > 0 ? (
        <Card className='flex-1 flex flex-col min-h-0'>
          <CardContent className='pt-6'>
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                <Search className='w-8 h-8 text-muted-foreground' />
              </div>
              <CardTitle className='mb-2'>No users found</CardTitle>
              <CardDescription>Try adjusting your search criteria or filters.</CardDescription>
            </div>
          </CardContent>
        </Card>
      ) : filteredData.length > 0 ? (
        <Card className='flex-1 flex flex-col min-h-0'>
          <CardHeader className='bg-muted/30'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Users List ({userCount})</CardTitle>
              <Badge variant='outline' className='gap-2'>
                <MoreHorizontal className='w-3 h-3' />
                Table View
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='p-0 flex-1 flex flex-col min-h-0'>
            <div className='overflow-auto flex-1 min-h-0'>
              <Table columns={columns} data={filteredData} />
            </div>
          </CardContent>
          {/* Pagination */}
          <div className='flex justify-end items-center gap-2 px-6 py-4 border-t bg-muted/30'>
            <Button
              variant='outline'
              size='sm'
              disabled={apiData?.page === 1}
              onClick={() => {
                // Implement page change logic here
              }}
            >
              Previous
            </Button>
            <span className='text-sm'>
              Page {apiData?.page ?? 1} of {apiData?.lastPage ?? 1}
            </span>
            <Button
              variant='outline'
              size='sm'
              disabled={apiData?.page === apiData?.lastPage}
              onClick={() => {
                // Implement page change logic here
              }}
            >
              Next
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default UsersPage;
