import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PositionModule } from './position/position.module';
import * as path from 'path';
import { Position } from './position/position.model';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/feedback.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Employee, Position, Feedback],
      autoLoadModels: true,
    }),
    EmployeeModule,
    FileModule,
    PositionModule,
    FeedbackModule,
  ],
})
export class AppModule {}
