import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.model';
import { Employee } from 'src/employee/employee.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackController],
  imports: [SequelizeModule.forFeature([Employee, Feedback]), EmployeeModule],
})
export class FeedbackModule {}
