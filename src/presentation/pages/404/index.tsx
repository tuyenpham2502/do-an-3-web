import { useTranslation } from 'react-i18next';


const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      404 - {t('page.notFound.title')}
    </div>
  );
};

export default NotFoundPage;
