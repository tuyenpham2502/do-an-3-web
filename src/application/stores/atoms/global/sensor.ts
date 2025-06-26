import { Sensor } from '@/domain/models/sensor/Sensor';
import { atomWithReset } from 'jotai/utils';

export const sensorAtom = atomWithReset<Sensor>({
  temperature: 0,
  humidity: 0,
  soilMoisture: 0,
});
