import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../../components/commons/AnimatedNumber';

import { sensorAtom } from '@/application/stores/atoms/global/sensor';
import { Sensor } from '@/domain/models/sensor/Sensor';
import { useAtomValue } from 'jotai';
import { ArrowDown, ArrowUp } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation(['common']);
  const sensorData = useAtomValue(sensorAtom);
  const [prevSensorData, setPrevSensorData] = useState<Sensor>({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
  });

  // Store previous sensorData in a ref
  const prevDataRef = useRef(sensorData);

  useEffect(() => {
    setPrevSensorData(prevDataRef.current);
    prevDataRef.current = sensorData;
  }, [sensorData]);

  const TrendIcon = ({ value, prevValue }: { value: number; prevValue: number }) => {
    if (value > prevValue) return <ArrowUp className='inline text-green-500 w-4 h-4' />;
    if (value < prevValue) return <ArrowDown className='inline text-red-500 w-4 h-4' />;
    return null;
  };

  if (!sensorData) {
    return (
      <div className='p-6 space-y-6'>
        <h1 className='text-2xl font-semibold mb-4'>{t('common:dashboard')}</h1>
        <div className='text-center text-gray-500'>{t('dashboard.waitingForSensorData')}</div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-semibold mb-4'>{t('dashboard.dashboard')}</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-blue-50 rounded-lg p-4 shadow flex flex-col items-center'>
          <span className='text-blue-500 text-4xl mb-2'>🌡️</span>
          <p className='text-lg font-medium'>{t('dashboard.temperature')}</p>
          <p className='text-2xl font-bold transition-all duration-500 flex items-center gap-1'>
            <AnimatedNumber value={sensorData.temperature} unit='°C' />
            <TrendIcon value={sensorData.temperature} prevValue={prevSensorData?.temperature} />
          </p>
        </div>
        <div className='bg-green-50 rounded-lg p-4 shadow flex flex-col items-center'>
          <span className='text-green-500 text-4xl mb-2'>💧</span>
          <p className='text-lg font-medium'>{t('dashboard.humidity')}</p>
          <p className='text-2xl font-bold transition-all duration-500 flex items-center gap-1'>
            <AnimatedNumber value={sensorData.humidity} unit='%' />
            <TrendIcon value={sensorData.humidity} prevValue={prevSensorData?.humidity} />
          </p>
        </div>
        <div className='bg-yellow-50 rounded-lg p-4 shadow flex flex-col items-center'>
          <span className='text-yellow-500 text-4xl mb-2'>🌱</span>
          <p className='text-lg font-medium'>{t('dashboard.soilMoisture')}</p>
          <p className='text-2xl font-bold transition-all duration-500 flex items-center gap-1'>
            <AnimatedNumber value={sensorData.soilMoisture} unit='%' />
            <TrendIcon value={sensorData.soilMoisture} prevValue={prevSensorData?.soilMoisture} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
