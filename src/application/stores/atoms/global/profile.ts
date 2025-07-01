import { UserResponse } from '@/domain/models/User';
import HttpClient from '@/infrastructure/http/HttpClient';
import { Endpoints } from '@/shared/endpoints';
import { buildUrl } from '@/shared/url';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

export const profileResetAtom = atom(false);

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
  };
});
