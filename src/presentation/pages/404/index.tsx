import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <Card variant='outlined' className='w-full max-w-md'>
        <div className='pt-6 text-center'>
          <div className='flex justify-center mb-4'>
            <QuestionCircleOutlined className='text-6xl text-gray-400 dark:text-gray-500' />
          </div>

          <Title level={1} className='mb-2 dark:text-white !m-0'>
            {t('error.notFound.title')}
          </Title>
          <Title level={2} className='text-gray-700 dark:text-gray-300 !mt-2 !mb-4'>
            {t('error.notFound.heading')}
          </Title>

          <Paragraph className='text-gray-500 dark:text-gray-400 mb-8'>
            {t('error.notFound.description')}
          </Paragraph>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button onClick={() => window.history.back()} className='w-full sm:w-auto' size='large'>
              {t('error.notFound.goBack')}
            </Button>

            <Button
              type='primary'
              onClick={() => {
                window.location.href = '/';
              }}
              className='w-full sm:w-auto'
              size='large'
            >
              {t('error.notFound.returnHome')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
