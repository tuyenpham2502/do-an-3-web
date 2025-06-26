import { UserResponse } from '@/domain/models/User';
import HttpClient from '@/infrastructure/http/HttpClient';
import { Endpoints } from '@/shared/endpoints';
import { buildUrl } from '@/shared/url';
import { atomWithQuery } from 'jotai-tanstack-query';

export const profileAtom = atomWithQuery(() => {
  const httpClient = HttpClient;

  return {
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await httpClient
        .getAxiosInstance()
        .get<UserResponse>(buildUrl(Endpoints.Profile.GET_PROFILE), {
          signal: httpClient.createAbortSignal(),
        });
      if (!response.data) {
        throw new Error('Profile data not found');
      }
      return response.data;
    },
    staleTime: 300000, // Data is fresh for 5 minutes
    cacheTime: 900000, // Cache data for 15 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second before retrying
  };
});
