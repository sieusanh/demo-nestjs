import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { LoggerMiddleware } from './common/middlewares';
// import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from 'src/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.use(LoggerMiddleware);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Demo NestJS')
        .setDescription('The APIs description')
        .setVersion('1.0')
        // .addTag('demo')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            docExpansion: 'none'
        }
    });

    // app.use(() => {
    //   throw new NotFoundException('Route not found.');
    // });

    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: true,
            whitelist: true,
            transform: true
        })
    );

    app.setGlobalPrefix('api');

    process.on('unhandledRejection', (error, promise) => {
        throw error;
    });

    process.on('uncaughtException', async (error) => {
        const defaultMessage = 'Server failed.';
        if (error instanceof Error) {
            console.error(error?.message || defaultMessage);
        } else if (typeof error === 'string') {
            console.error(error || defaultMessage);
        }

        // process.exit(1);
    });

    // app.use(cookieParser());

    const configService = app.get(ConfigService);
    const port = configService.get('PORT');
    await app.listen(port).catch(err => {
        console.log('Server Error: ', err);
    });
}

bootstrap();
