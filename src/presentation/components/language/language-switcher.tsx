import { Language, languageAtom } from '@/application/stores/atoms/global/language';
import { CheckOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

const languages: { value: Language; label: string; ariaLabel: string }[] = [
  {
    value: 'en',
    label: 'English',
    ariaLabel: 'Switch to English language',
  },
  {
    value: 'vi',
    label: 'Tiếng Việt',
    ariaLabel: 'Chuyển sang tiếng Việt',
  },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useAtom(languageAtom);

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const currentLang = languages.find((lang) => lang.value === currentLanguage);

  const items = languages.map((language) => ({
    key: language.value,
    label: (
      <div className='flex items-center' onClick={() => handleLanguageChange(language.value)}>
        <CheckOutlined
          className={`mr-2 ${currentLanguage === language.value ? 'opacity-100' : 'opacity-0'}`}
        />
        {language.label}
      </div>
    ),
  }));

  return (
    <Dropdown menu={{ items }} placement='bottomRight'>
      <Button
        type='text'
        className='flex items-center gap-2 h-auto'
        aria-label={currentLang?.ariaLabel}
      >
        <GlobalOutlined className='text-base' />
        <span className='hidden md:inline-block'>{currentLang?.label}</span>
      </Button>
    </Dropdown>
  );
}
