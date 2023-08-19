import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { Position } from 'src/position/position.model';
import { Feedback } from 'src/feedback/feedback.model';

@Module({
  providers: [EmployeeService],
  controllers: [EmployeeController],
  imports: [
    SequelizeModule.forFeature([Employee, Position, Feedback]),
    FileModule,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
