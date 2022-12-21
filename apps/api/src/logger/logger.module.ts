import { Module } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { PinoLogger, LoggerModule } from 'nestjs-pino';
import { ReqId } from 'pino-http';
import { v4 as uuidv4 } from 'uuid';

@Module({
  providers: [PinoLogger],
  exports: [PinoLogger],
  imports: [
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV !== 'production'
          ? {
              genReqId: (req: IncomingMessage): ReqId => {
                if (req.id) return req.id;
                let requestId: string = req.headers['X-Request-Id']?.toString();
                if (requestId) return requestId;
                requestId = uuidv4();
                return requestId;
              },
              level: 'debug',
              transport: {
                target: require.resolve('./pino-pretty-transport'),
                options: {
                  colorize: true,
                  levelFirst: false,
                  translateTime: 'dd/mm/yyyy HH:MM:ss',
                  ignore: 'pid,hostname',
                  hideObject: true,
                },
              },
              formatters: {
                level: (label: string): object => {
                  return { level: label };
                },
              },
            }
          : {},
      // forRoutes: [MyController],
      // exclude: [{ method: RequestMethod.ALL, path: "check" }]
    }),
  ],
})
export class CustomLoggerModule {}
