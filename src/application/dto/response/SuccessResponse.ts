import { RequestResponse } from './RequestResponse';

export default class SuccessResponse<T> extends RequestResponse {
  message: string;
  data: T;
  success: boolean;

  constructor(message: string, data: T) {
    super(200); // Assuming status 200 for success
    this.message = message;
    this.data = data;
    this.success = true;
  }
}
