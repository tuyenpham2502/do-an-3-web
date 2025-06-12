/* eslint-disable no-console */
import { LoggerService } from '@/application/services/LoggerService';
import DateTimeProvider from '@/infrastructure/services/DateTimeServiceImpl';

export default class LoggerServiceImpl implements LoggerService {
  private readonly enabledLogger: boolean = import.meta.env.VITE_APP_ENABLE_LOGGER === 'true';

  debug(...params: any[]) {
    if (this.enabledLogger)
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.debug(`[DEBUG] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
  }

  error(...params: any[]) {
    if (this.enabledLogger)
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(`[ERROR] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
  }

  fatal(...params: any[]) {
    if (this.enabledLogger)
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(`[ERROR] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
  }

  info(...params: any[]) {
    if (this.enabledLogger)
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.info(`[INFO] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
  }

  trace(...params: any[]) {
    if (this.enabledLogger)
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.trace(`[TRACE] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
  }

  warn(...params: any[]) {
    if (this.enabledLogger)
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.warn(`[WARN] - ${new DateTimeProvider().currentDateTime()}: `, ...params);
  }
}
