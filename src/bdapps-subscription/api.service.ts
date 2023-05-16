import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);
  private readonly baseUrl = 'https://developer.bdapps.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async makeApiCall<Request, Response>(
    path: string,
    requestBody: Request,
  ): Promise<
    { success: boolean; data: Response } | { success: boolean; error: string }
  > {
    const applicationId = this.configService.get<string>('BDAPPS_APP_ID');
    const password = this.configService.get<string>('BDAPPS_PASSWORD');

    const url = `${this.baseUrl}/${path}`;

    const requestConfig = {
      url,
      data: {
        applicationId,
        password,
        ...requestBody,
      },
    };

    try {
      const response = await this.httpService
        .post<Response>(requestConfig.url, requestConfig.data)
        .toPromise();

      this.logApiResponse(response.data); // Log the API response
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.logger.error('Failed to make API call:', error);
      if (error.response && error.response.status === 404) {
        throw new HttpException('API endpoint not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Failed to make API call',
          HttpStatus.BAD_REQUEST,
        );
      }
      // return { success: false, error: error.message };
      // throw new Error('Failed to make API call');
    }
  }

  private logApiResponse(responseData: any): void {
    this.logger.debug('API Response:', responseData);
  }
  private handleSuccessResponse<Response>(
    responseData: Response,
  ):
    | { success: boolean; data: Response }
    | { success: boolean; error: string } {
    const { statusCode, statusDetail, ...data } = responseData as any;

    if (statusCode === 'S1000') {
      return { success: true, data };
    }

    return { success: false, error: statusDetail };
  }
}
