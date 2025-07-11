import NetworkException from '@/application/exceptions/NetworkException';
import LocalStorageService from '@/infrastructure/services/LocalStorageServiceImpl';
import LoggerService from '@/infrastructure/services/LoggerServiceImpl';
import { AppRoutes } from '@/shared/appRoutes';
import { Constants } from '@/shared/constants';
import { Endpoints } from '@/shared/endpoints';
import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface RefreshTokenResponse {
  accessToken: string;
}

interface ErrorResponse {
  message: string;
  status?: number;
}

interface FormattedError {
  message: string;
  status?: number;
  timestamp: string;
  path?: string;
}

class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshQueue: Array<(token: string) => void> = [];
  private abortController: AbortController | null = null;
  private readonly loggerService: LoggerService = new LoggerService();
  private readonly localStorageService: LocalStorageService = new LocalStorageService();
  private readonly TIMEOUT: number;

  constructor(timeout: number = Number(import.meta.env.VITE_APP_TIMEOUT) || 30000) {
    this.TIMEOUT = timeout;

    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      timeout: this.TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    });

    this.addInterceptors();
    this.abortController = new AbortController();
  }

  private addInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => this.handleRequest(config),
      (error: AxiosError) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => this.handleResponse(response),
      (error: AxiosError<ErrorResponse>) => this.handleResponseError(error)
    );
  }

  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = this.localStorageService.readStorage(Constants.API_TOKEN_STORAGE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    this.loggerService.info(
      `✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url} | Success`
    );
    return response;
  }

  private async handleResponseError(error: AxiosError<ErrorResponse>): Promise<any> {
    if (!error.response) {
      this.loggerService.error('Network Error:', error.message);
      throw new NetworkException('Network error occurred');
    }

    const { status, config } = error.response;
    if (status === 401 && !config.url?.includes(Endpoints.Auth.LOGIN))
      return this.handle401Error(error);
    // if ([500, 502, 503, 504, 429].includes(status) && retryCount < this.MAX_RETRIES) {
    //   return this.retryRequest(config!, retryCount);
    // }

    throw this.formatError(error);
  }

  private async handle401Error(error: AxiosError<ErrorResponse>): Promise<any> {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshQueue.push((newToken) => {
          originalRequest.headers!.Authorization = `Bearer ${newToken}`;
          resolve(this.instance(originalRequest));
        });
      });
    }

    this.isRefreshing = true;
    const refreshToken = this.localStorageService.readStorage(
      Constants.API_REFRESH_TOKEN_STORAGE
    ) as string | null;
    if (!refreshToken) return this.handleLogout();

    try {
      const { data } = await this.instance.post<RefreshTokenResponse>('/auth/refresh-token', {
        refreshToken,
      });
      const newToken = data.accessToken;
      this.localStorageService.setStorage(Constants.API_TOKEN_KEY, newToken);

      this.refreshQueue.forEach((callback) => callback(newToken));
      this.refreshQueue = [];

      originalRequest.headers!.Authorization = `Bearer ${newToken}`;
      return this.instance(originalRequest);
    } catch {
      return this.handleLogout();
    } finally {
      this.isRefreshing = false;
    }
  }

  private handleLogout(): void {
    this.localStorageService.removeStorage(Constants.API_TOKEN_KEY);
    this.localStorageService.removeStorage(Constants.API_REFRESH_TOKEN_STORAGE);
    window.location.assign(AppRoutes.PUBLIC.AUTH.LOGIN);
  }

  private formatError(error: AxiosError<ErrorResponse>): FormattedError {
    return {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.data?.status,
      timestamp: new Date().toISOString(),
      path: error.config?.url,
    };
  }

  public createAbortSignal(): AbortSignal {
    this.abortController = new AbortController();
    return this.abortController?.signal;
  }

  public cancelRequests(): void {
    if (!this.abortController) {
      this.loggerService.warn('AbortController is not initialized. Initializing now.');
      this.abortController = new AbortController(); // Initialize if undefined
    }
    this.abortController.abort();
    this.abortController = new AbortController(); // Reinitialize after aborting
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

export default new HttpClient();
