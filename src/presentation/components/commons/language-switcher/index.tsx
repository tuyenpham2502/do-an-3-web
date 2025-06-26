import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import { languageAtom } from '@/application/stores/atoms/global/language';
import { Button } from '@/presentation/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useAtom(languageAtom);

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='w-9 px-0'>
          {language === 'en' ? 'EN' : 'VI'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('vi')}>Tiếng Việt</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
