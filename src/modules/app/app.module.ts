import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_PIPE, APP_GUARD, APP_INTERCEPTOR, RouterModule, Routes } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule, EmployeesModule } from 'src/modules/hr';
import { UserAuthModule } from 'src/modules/auth';
import { LoggerMiddleware } from 'src/common/middlewares';
import * as cors from 'cors';
import helmet from 'helmet';
import { HttpExceptionFilter, AllExceptionsFilter } from 'src/common/exception';
import { ValidationPipe, RolesGuard, LoggingInterceptor } from 'src/common';
import { ConfigModule } from '@nestjs/config';
import {
    // configuration, 
    appConfig, databaseConfig, validate
} from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiConfigService } from 'src/config';

import { 
    PATH_HR,
    PATH_ACCOUNT_MODULE, 
    PATH_EMPLOYEE_MODULE,
    PATH_ERP,
    PATH_AUTH,
    PATH_USER_AUTH_MODULE

} from './app.constant';

const dataSource = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres123',
    database: 'tasks_management',
    autoLoadEntities: true,
    synchronize: false,
    // entities: [Account],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    // Addition properties
    // retryAttempts: 10
    // retryDelay: 3000
    // autoLoadEntities: false
    // Learn more: https://typeorm.io/data-source-options
    // Once this is done, the TypeORM DataSource and EntityManager objects will be available to inject across the entire project (without needing to import any modules)
} as any;

// const configServiceProvider = {
//     provide: ConfigService,
//     useClass:
//       process.env.NODE_ENV === 'development'
//         ? DevelopmentConfigService
//         : ProductionConfigService,
//   };

const routes: Routes = [
    {
        path: PATH_HR,
        children: [
            {
                path: PATH_ACCOUNT_MODULE,
                module: AccountsModule
            },
            {
                path: PATH_EMPLOYEE_MODULE,
                module: EmployeesModule
            }
        ]
    }, 
    {
        path: PATH_AUTH,
        children: [
            {
                path: PATH_USER_AUTH_MODULE,
                module: UserAuthModule
            }
        ]
    }
];

@Module({
    imports: [
        AccountsModule,
        EmployeesModule,
        UserAuthModule,
        RouterModule.register(routes),
        // HrModule,
        // UserAuthModule,
        ConfigModule.forRoot({
            validate,
            envFilePath: '.development.env',
            // If a variable is found in multiple files, the first one takes precedence.
            // envFilePath: ['.env.development.local', '.env.development'],
            // ignoreEnvFile: true,
            // isGlobal: true,
            // load: [configuration]
            load: [appConfig, databaseConfig],
            cache: true
        }),
        TypeOrmModule.forRoot(dataSource),

    ],
    controllers: [
        AppController
    ],
    providers: [
        // {
        //   provide: APP_FILTER,
        //   useClass: AllExceptionsFilter, //HttpExceptionFilter
        // },
        // {
        //   provide: APP_PIPE,
        //   useClass: ValidationPipe,
        // },
        // {
        //   provide: APP_GUARD,
        //   useClass: RolesGuard,
        // },
        // {
        //   provide: APP_INTERCEPTOR,
        //   useClass: LoggingInterceptor
        // },
        AppService,
        ApiConfigService,
        // configServiceProvider,
    ],
})
export class AppModule implements NestModule {

    constructor(private dataSource: DataSource) {}

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(cors(), helmet(), LoggerMiddleware)
            // .forRoutes(AccountsController, OrdersModule);
            .forRoutes('*');
    }
}
