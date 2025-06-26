import z from 'zod';

export const systemSettingSchema = z.object({
  tempThreshold1: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  tempThreshold2: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  humiThreshold1: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  humiThreshold2: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  soilMoistureThreshold1: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
  soilMoistureThreshold2: z.coerce.number().min(0, { message: 'Must be a non-negative number' }),
});
