import { useToast } from '@/presentation/hooks/use-toast';
import { buildUrl } from '@/shared/url';
import { MutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface ApiConfig<TResponse, TRequest> {
  showErrorToast?: boolean;
  successMessage?: string;
  silentError?: boolean;
  onError?: (error: ApiError, variables?: TRequest, context?: unknown) => void;
  onSuccess?: (data: TResponse, variables: TRequest, context: unknown) => void;
}

const handleApiError = <TRequest>(
  error: ApiError,
  toast: ReturnType<typeof useToast>['toast'],
  silentError?: boolean,
  onError?: (error: ApiError, variables?: TRequest, context?: unknown) => void,
  variables?: TRequest | undefined,
  context?: unknown
) => {
  if (!silentError) {
    toast({
      title: 'Error',
      description: error.message || 'An unexpected error occurred.',
      variant: 'destructive',
    });
  }
  if (onError) onError(error, variables, context);
};

export const useGetApi = <TResponse>({
  endpoint,
  urlParams = {},
  queryParams = {},
  options = {},
}: {
  endpoint: string;
  urlParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: Omit<UseQueryOptions<TResponse, ApiError>, 'queryKey' | 'queryFn'>;
}) => {
  const { axiosInstance, newAbortSignal } = useAxios();

  return useQuery<TResponse, ApiError>({
    queryKey: [endpoint, urlParams, queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get<TResponse>(
        buildUrl(endpoint, urlParams, queryParams),
        { signal: newAbortSignal() }
      );
      return response.data;
    },
    ...options,
  });
};

const useMutationApi = <TRequest = void, TResponse = unknown>(
  method: 'post' | 'put' | 'delete',
  {
    endpoint,
    queryParams = {},
    options = {},
  }: {
    endpoint: string;
    queryParams?: Record<string, string | number | boolean | undefined>;
    options?: MutationOptions<TResponse, ApiError, TRequest, ApiConfig<TResponse, TRequest>>;
  }
) => {
  const { axiosInstance, newAbortSignal } = useAxios();
  const { toast } = useToast();
  return useMutation<TResponse, ApiError, TRequest, ApiConfig<TResponse, TRequest>>({
    mutationFn: async (payload: TRequest) => {
      const response = await axiosInstance[method]<TResponse>(
        buildUrl(endpoint, null, queryParams),
        method !== 'delete' ? payload : undefined,
        { signal: newAbortSignal() }
      );
      return response.data;
    },
    ...options,
    onError: (
      error: ApiError,
      variables: TRequest,
      context: ApiConfig<TResponse, TRequest> | undefined
    ) => {
      const config = context || {};
      handleApiError(
        error,
        toast,
        config.silentError,
        options.onError as
          | ((error: ApiError, variables?: TRequest, context?: unknown) => void)
          | undefined,
        variables,
        context
      );
    },
    onSuccess: (
      data: TResponse,
      variables: TRequest,
      context: ApiConfig<TResponse, TRequest> | undefined
    ) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context || ({} as ApiConfig<TResponse, TRequest>));
      }
    },
  });
};

export const usePostApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<TResponse, ApiError, TRequest, ApiConfig<TResponse, TRequest>>;
}) => useMutationApi<TRequest, TResponse>('post', props);

export const usePutApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<TResponse, ApiError, TRequest, ApiConfig<TResponse, TRequest>>;
}) => useMutationApi<TRequest, TResponse>('put', props);

export const useDeleteApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<TResponse, ApiError, TRequest, ApiConfig<TResponse, TRequest>>;
}) => useMutationApi<TRequest, TResponse>('delete', props);
