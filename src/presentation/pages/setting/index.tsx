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
import { Separator } from '@/presentation/components/ui/separator';
import { toast } from '@/presentation/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

const formSchema = z.object({
  tempThreshold1: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  tempThreshold2: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  humiThreshold1: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  humiThreshold2: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  soilMoistureThreshold1: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  soilMoistureThreshold2: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingPage: React.FC = () => {
  const { t } = useTranslation();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tempThreshold1: 0,
      tempThreshold2: 0,
      humiThreshold1: 0,
      humiThreshold2: 0,
      soilMoistureThreshold1: 0,
      soilMoistureThreshold2: 0,
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log('Form submitted with values:', values);
    toast({
      title: 'Settings Updated',
      description: 'Your threshold settings have been saved.',
    });
    // Here you would typically send the data to an API
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-muted/40 rounded-lg p-6 border border-muted shadow-sm mb-4'>
        <div className='flex items-center gap-4'>
          <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-2xl shadow border border-primary/20'>
            ⚙️
          </span>
          <div>
            <h3 className='text-2xl font-bold tracking-tight mb-1'>{t('settings.title')}</h3>
            <p className='text-base text-muted-foreground'>{t('settings.description')}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            form.handleSubmit(onSubmit)();
          }}
          className='mt-4 md:mt-0 text-base font-semibold shadow'
        >
          {t('common.saveChanges')}
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Temperature Section */}
          <div className='bg-muted/40 rounded-lg p-6 mb-2'>
            <div className='flex items-center mb-4 gap-2'>
              <span role='img' aria-label='temperature'>
                🌡️
              </span>
              <h4 className='font-semibold text-base'>{t('settings.temperatureSection')}</h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='tempThreshold1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.tempThreshold1')}</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <p className='text-xs text-muted-foreground'>
                      {t('settings.tempThreshold1Help')}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tempThreshold2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.tempThreshold2')}</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <p className='text-xs text-muted-foreground'>
                      {t('settings.tempThreshold2Help')}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Humidity Section */}
          <div className='bg-muted/40 rounded-lg p-6 mb-2'>
            <div className='flex items-center mb-4 gap-2'>
              <span role='img' aria-label='humidity'>
                💧
              </span>
              <h4 className='font-semibold text-base'>{t('settings.humiditySection')}</h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='humiThreshold1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.humiThreshold1')}</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <p className='text-xs text-muted-foreground'>
                      {t('settings.humiThreshold1Help')}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='humiThreshold2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.humiThreshold2')}</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <p className='text-xs text-muted-foreground'>
                      {t('settings.humiThreshold2Help')}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Soil Moisture Section */}
          <div className='bg-muted/40 rounded-lg p-6 mb-2'>
            <div className='flex items-center mb-4 gap-2'>
              <span role='img' aria-label='soil moisture'>
                🌱
              </span>
              <h4 className='font-semibold text-base'>{t('settings.soilMoistureSection')}</h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='soilMoistureThreshold1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.soilMoistureThreshold1')}</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <p className='text-xs text-muted-foreground'>
                      {t('settings.soilMoistureThreshold1Help')}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='soilMoistureThreshold2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.soilMoistureThreshold2')}</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <p className='text-xs text-muted-foreground'>
                      {t('settings.soilMoistureThreshold2Help')}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingPage;
