import { Button } from '@/presentation/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
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
import { useGetSystemSetting } from '@/presentation/hooks/system-setting/useGetSystemSetting';
import { useUpdateSystemSetting } from '@/presentation/hooks/system-setting/useUpdateSystemSetting';
import { systemSettingSchema } from '@/shared/schemas/system-setting/system-setting';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

type SettingsFormValues = z.infer<typeof systemSettingSchema>;

const SettingPage: React.FC = () => {
  const { t } = useTranslation();

  const { data: dataSetting } = useGetSystemSetting(); // Fetches the current settings
  const { updateSystemSetting, isPending } = useUpdateSystemSetting(); // Provides the update function

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(systemSettingSchema),
    defaultValues: {
      tempThreshold1: 0,
      tempThreshold2: 0,
      humiThreshold1: 0,
      humiThreshold2: 0,
      soilMoistureThreshold1: 0,
      soilMoistureThreshold2: 0,
    },
  });

  // Plant presets
  const plantPresets = {
    raumam: {
      label: t('settings.plant.raumam'),
      icon: '🌱',
      tempThreshold1: 20,
      tempThreshold2: 25,
      humiThreshold1: 50,
      humiThreshold2: 70,
      soilMoistureThreshold1: 60,
      soilMoistureThreshold2: 80,
    },
    bapcai: {
      label: t('settings.plant.bapcai'),
      icon: '🥬',
      tempThreshold1: 15,
      tempThreshold2: 21,
      humiThreshold1: 60,
      humiThreshold2: 80,
      soilMoistureThreshold1: 60,
      soilMoistureThreshold2: 80,
    },
    cachua: {
      label: t('settings.plant.cachua'),
      icon: '🍅',
      tempThreshold1: 15,
      tempThreshold2: 25,
      humiThreshold1: 60,
      humiThreshold2: 80,
      soilMoistureThreshold1: 60,
      soilMoistureThreshold2: 80,
    },
    xalach: {
      label: t('settings.plant.xalach'),
      icon: '🥗',
      tempThreshold1: 15,
      tempThreshold2: 20,
      humiThreshold1: 60,
      humiThreshold2: 80,
      soilMoistureThreshold1: 60,
      soilMoistureThreshold2: 80,
    },
    duachuot: {
      label: t('settings.plant.duachuot'),
      icon: '🥒',
      tempThreshold1: 20,
      tempThreshold2: 25,
      humiThreshold1: 60,
      humiThreshold2: 80,
      soilMoistureThreshold1: 60,
      soilMoistureThreshold2: 80,
    },
    senda: {
      label: t('settings.plant.senda'),
      icon: '🌸',
      tempThreshold1: 15,
      tempThreshold2: 25,
      humiThreshold1: 30,
      humiThreshold2: 50,
      soilMoistureThreshold1: 30,
      soilMoistureThreshold2: 50,
    },
    raumui: {
      label: t('settings.plant.raumui'),
      icon: '🌿',
      tempThreshold1: 15,
      tempThreshold2: 20,
      humiThreshold1: 50,
      humiThreshold2: 70,
      soilMoistureThreshold1: 60,
      soilMoistureThreshold2: 80,
    },
  };

  type PlantKey = keyof typeof plantPresets;
  const [selectedPlant, setSelectedPlant] = React.useState<PlantKey | null>(null);
  const isReadonly = selectedPlant !== null;

  const handlePlantSelect = (value: string) => {
    if (value === 'custom') {
      setSelectedPlant(null);
      return;
    }
    const preset = plantPresets[value as keyof typeof plantPresets];
    if (preset) {
      form.reset({
        tempThreshold1: preset.tempThreshold1,
        tempThreshold2: preset.tempThreshold2,
        humiThreshold1: preset.humiThreshold1,
        humiThreshold2: preset.humiThreshold2,
        soilMoistureThreshold1: preset.soilMoistureThreshold1,
        soilMoistureThreshold2: preset.soilMoistureThreshold2,
      });
      setSelectedPlant(value as PlantKey);
    }
  };

  React.useEffect(() => {
    if (dataSetting) {
      form.reset({
        tempThreshold1: dataSetting.tempThreshold1,
        tempThreshold2: dataSetting.tempThreshold2,
        humiThreshold1: dataSetting.humiThreshold1,
        humiThreshold2: dataSetting.humiThreshold2,
        soilMoistureThreshold1: dataSetting.soilMoistureThreshold1,
        soilMoistureThreshold2: dataSetting.soilMoistureThreshold2,
      });
    }
  }, [dataSetting, form]);

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await updateSystemSetting({
        ...values,
        isPumpOn: dataSetting?.isPumpOn ?? false,
      });
      // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    } catch {}
  };

  React.useEffect(() => {
    if (dataSetting) {
      form.reset({
        tempThreshold1: dataSetting.tempThreshold1,
        tempThreshold2: dataSetting.tempThreshold2,
        humiThreshold1: dataSetting.humiThreshold1,
        humiThreshold2: dataSetting.humiThreshold2,
        soilMoistureThreshold1: dataSetting.soilMoistureThreshold1,
        soilMoistureThreshold2: dataSetting.soilMoistureThreshold2,
      });
    }
  }, [dataSetting, form]);

  // Removed duplicate onSubmit to resolve redeclaration error

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
          disabled={isPending}
          onClick={() => {
            form.handleSubmit(onSubmit)();
          }}
          className='mt-4 md:mt-0 text-base font-semibold shadow'
        >
          {t('common.saveChanges')}
        </Button>
      </div>
      <Separator />
      <div className='mb-6 flex flex-col items-center'>
        <div className='flex items-center gap-3 mb-2'>
          <span className='text-2xl'>🌿</span>
          <span className='font-semibold text-lg'>{t('settings.plant.selectTitle')}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='w-64 justify-between text-base font-medium shadow border-primary/30'
            >
              {selectedPlant ? (
                <span className='truncate flex items-center'>
                  <span className='mr-2'>{plantPresets[selectedPlant].icon}</span>
                  {plantPresets[selectedPlant].label}
                </span>
              ) : (
                <span className='truncate'>{t('settings.plant.selectPlaceholder')}</span>
              )}
              <svg width='18' height='18' fill='none' viewBox='0 0 24 24'>
                <path
                  d='M7 10l5 5 5-5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64 rounded-lg shadow-lg border border-primary/20'>
            {Object.entries(plantPresets).map(([key, preset]) => (
              <DropdownMenuItem key={key} onSelect={() => handlePlantSelect(key as PlantKey)}>
                <span className='mr-2'>{preset.icon}</span> {preset.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onSelect={() => handlePlantSelect('custom')}>
              <span className='mr-2'>✏️</span> {t('settings.plant.custom')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                      <Input type='number' {...field} readOnly={isReadonly} />
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
                      <Input type='number' {...field} readOnly={isReadonly} />
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
                      <Input type='number' {...field} readOnly={isReadonly} />
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
                      <Input type='number' {...field} readOnly={isReadonly} />
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
