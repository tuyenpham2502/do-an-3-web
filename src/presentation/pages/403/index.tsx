import { HomeOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function PermissionDeniedPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <Card variant='outlined' className='w-full max-w-md'>
        <div className='text-center'>
          <LockOutlined className='text-4xl text-red-500' />

          <Title level={2} className='mt-4 !mb-2'>
            403 - Forbidden
          </Title>

          <Text type='secondary' className='block mb-6'>
            You don't have permission to access this page.
          </Text>

          <Text type='secondary' className='block text-sm mb-6'>
            If you believe this is a mistake, please contact the administrator.
          </Text>

          <Link to='/'>
            <Button type='primary' icon={<HomeOutlined />} size='large'>
              Go Back Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
