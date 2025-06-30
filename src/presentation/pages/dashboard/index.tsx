import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Chart components
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AnimatedNumber from '../../components/commons/AnimatedNumber';

import { sensorAtom } from '@/application/stores/atoms/global/sensor';
import { settingAtom } from '@/application/stores/atoms/global/setting';
import { Sensor } from '@/domain/models/sensor/Sensor';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { Switch } from '@/presentation/components/ui/switch';
import { useGetReadings } from '@/presentation/hooks/readings/useGetReadings';
import { useGetAutoWarningSetting } from '@/presentation/hooks/system-setting/useGetAutoWarningSetting';
import { useGetRelaySetting } from '@/presentation/hooks/system-setting/useGetRelaySetting';
import { useUpdateAutoWarningSetting } from '@/presentation/hooks/system-setting/useUpdateAutoWarningSetting';
import { useUpdateRelaySetting } from '@/presentation/hooks/system-setting/useUpdateRelaySetting';
import { useAtomValue } from 'jotai';
import { ArrowDown, ArrowUp } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation(['common']);
  const sensorData = useAtomValue(sensorAtom);
  const settingData = useAtomValue(settingAtom); // Assuming you want to use the same atom for settings
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isAutoWarningOn, setIsAutoWarningOn] = useState(false);
  const [prevSensorData, setPrevSensorData] = useState<Sensor>({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    time: '',
  });
  const { data } = useGetReadings(); // Assuming this hook fetches the sensor data
  const { updateRelaySetting } = useUpdateRelaySetting(); // Provides the update function
  const { updateAutoWaringSetting } = useUpdateAutoWarningSetting(); // Assuming you have a similar hook for auto warning setting

  // Chart data state for live updates
  const [chartData, setChartData] = useState<any[]>([]);

  // Initialize chart data from useGetReadings() once
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0 && chartData.length === 0) {
      setChartData(
        data
          .slice(-30)
          .reverse()
          .map((d) => ({
            ...d,
            createdAt: new Date(d.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Add new sensorData from socket to chartData
  useEffect(() => {
    if (sensorData && sensorData.time) {
      setChartData((prev) => {
        // Prevent duplicate if the latest already matches
        if (prev.length > 0 && prev[prev.length - 1].time === sensorData.time) {
          return prev;
        }
        return [
          ...prev.slice(-29),
          {
            ...sensorData,
            createdAt: new Date(sensorData.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          },
        ];
      });
    }
  }, [sensorData]);

  // FIX: Add isLoadingRelay from useGetRelaySetting
  const { isLoading: isLoadingRelay } = useGetRelaySetting();
  // FIX: Add isLoadingAutoWarning from useGetAutoWarningSetting
  const { isLoading: isLoadingAutoWarning } = useGetAutoWarningSetting();

  // Handle relay setting update
  const handleRelaySettingUpdate = (newSetting: boolean) => {
    updateRelaySetting({
      relayState: newSetting ? 1 : 0,
    });
  };

  // Handle auto warning setting update
  const handleAutoWarningSettingUpdate = (newSetting: boolean) => {
    updateAutoWaringSetting({
      autoWarningState: newSetting ? 1 : 0,
    });
  };

  // Pump status state

  useEffect(() => {
    // Initialize pump status from setting data
    if (settingData) {
      setIsPumpOn(settingData.isPumpOn);
      setIsAutoWarningOn(settingData.autoWarning);
    }
  }, [settingData]);

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

  return (
    <div className='flex-1 space-y-8 p-8'>
      <h2 className='text-3xl font-bold tracking-tight'>{t('dashboard.dashboard')}</h2>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Temperature Card */}
        <div className='flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-lg transition-all duration-300 hover:scale-105'>
          <span className='mb-3 text-5xl'>🌡️</span>
          <p className='text-xl font-semibold text-blue-800'>{t('dashboard.temperature')}</p>
          <p className='mt-2 flex items-center gap-2 text-4xl font-bold text-blue-900'>
            <AnimatedNumber value={sensorData.temperature} unit='°C' />
            <TrendIcon value={sensorData.temperature} prevValue={prevSensorData?.temperature} />
          </p>
        </div>

        {/* Humidity Card */}
        <div className='flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-lg transition-all duration-300 hover:scale-105'>
          <span className='mb-3 text-5xl'>💧</span>
          <p className='text-xl font-semibold text-green-800'>{t('dashboard.humidity')}</p>
          <p className='mt-2 flex items-center gap-2 text-4xl font-bold text-green-900'>
            <AnimatedNumber value={sensorData.humidity} unit='%' />
            <TrendIcon value={sensorData.humidity} prevValue={prevSensorData?.humidity} />
          </p>
        </div>

        {/* Soil Moisture Card */}
        <div className='flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 shadow-lg transition-all duration-300 hover:scale-105'>
          <span className='mb-3 text-5xl'>🌱</span>
          <p className='text-xl font-semibold text-yellow-800'>{t('dashboard.soilMoisture')}</p>
          <p className='mt-2 flex items-center gap-2 text-4xl font-bold text-yellow-900'>
            <AnimatedNumber value={sensorData.soilMoisture} unit='%' />
            <TrendIcon value={sensorData.soilMoisture} prevValue={prevSensorData?.soilMoisture} />
          </p>
        </div>
      </div>

      {/* Switches in same row, responsive */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-8 pt-4 w-full'>
        {/* Pump status switch */}
        <div className='flex-1 flex items-center gap-4 bg-white rounded-lg shadow-md px-6 py-4 min-w-[220px]'>
          <span className='flex items-center gap-2 font-medium text-xl'>
            <span
              className={`w-3 h-3 rounded-full ${isPumpOn ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}
              aria-hidden='true'
            ></span>
            {t('dashboard.pumpStatus') || 'Pump Status'}
          </span>
          {isLoadingRelay ? (
            <Skeleton className='h-8 w-20' />
          ) : (
            <>
              <Switch
                checked={isPumpOn}
                onCheckedChange={(checked) => {
                  setIsPumpOn(checked);
                  handleRelaySettingUpdate(checked);
                }}
                className={`scale-150 transition-transform ${isPumpOn ? 'ring-2 ring-green-400' : 'ring-0'}`}
                aria-label={t('dashboard.pumpStatus') || 'Pump Status'}
              />
              <span
                className={`ml-3 text-lg font-semibold ${isPumpOn ? 'text-green-600' : 'text-gray-500'} transition-colors`}
              >
                {isPumpOn ? t('dashboard.on') || 'On' : t('dashboard.off') || 'Off'}
              </span>
            </>
          )}
        </div>
        {/* Auto Warning status switch */}
        <div className='flex-1 flex items-center gap-4 bg-white rounded-lg shadow-md px-6 py-4 min-w-[220px]'>
          <span className='flex items-center gap-2 font-medium text-xl'>
            <span
              className={`w-3 h-3 rounded-full ${isAutoWarningOn ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}
              aria-hidden='true'
            ></span>
            {t('dashboard.autoWarning') || 'Auto Warning'}
          </span>
          {isLoadingAutoWarning ? (
            <Skeleton className='h-8 w-20' />
          ) : (
            <>
              <Switch
                checked={isAutoWarningOn}
                onCheckedChange={(checked) => {
                  setIsAutoWarningOn(checked);
                  handleAutoWarningSettingUpdate(checked);
                }}
                className={`scale-150 transition-transform ${isAutoWarningOn ? 'ring-2 ring-blue-400' : 'ring-0'}`}
                aria-label={t('dashboard.autoWarning') || 'Auto Warning'}
              />
              <span
                className={`ml-3 text-lg font-semibold ${isAutoWarningOn ? 'text-blue-600' : 'text-gray-500'} transition-colors`}
              >
                {isAutoWarningOn ? t('dashboard.on') || 'On' : t('dashboard.off') || 'Off'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Sensor Trends Chart */}
      {chartData.length > 0 && (
        <div className='mt-8 bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-bold mb-4'>
            {t('dashboard.sensorTrends') || 'Sensor Trends'}
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey='createdAt' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='temperature'
                stroke='#2563eb'
                name='Temperature (°C)'
              />
              <Line type='monotone' dataKey='humidity' stroke='#22c55e' name='Humidity (%)' />
              <Line
                type='monotone'
                dataKey='soilMoisture'
                stroke='#eab308'
                name='Soil Moisture (%)'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
