import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() dto: CreateEmployeeDto, @UploadedFile() photo) {
    return this.employeeService.createEmployee(dto, photo);
  }

  @Get()
  getAll() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.employeeService.getByIdEmployee(id);
  }
}
