import { Injectable } from '@nestjs/common';
import { Employee } from './employee.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FileService } from 'src/file/file.service';
import { Position } from 'src/position/position.model';
import { Feedback } from 'src/feedback/feedback.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private fileService: FileService,
  ) {}

  async createEmployee(dto: CreateEmployeeDto, photo: any) {
    const fileName = await this.fileService.createFile(photo);
    const employee = await this.employeeRepository.create({
      ...dto,
      photo: fileName,
    });
    return employee;
  }

  async getByIdEmployee(employeeId: number) {
    const employee = await this.employeeRepository.findByPk(employeeId, {
      include: [
        {
          model: Position,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Feedback,
          attributes: { exclude: ['createdAt', 'updatedAt', 'employeeId'] },
        },
      ],

      attributes: { exclude: ['createdAt', 'updatedAt', 'positionId'] },
    });
    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll({
      include: [
        {
          model: Position,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Feedback,
          attributes: { exclude: ['createdAt', 'updatedAt', 'employeeId'] },
        },
      ],

      attributes: { exclude: ['createdAt', 'updatedAt', 'positionId'] },
    });
    return employees;
  }

  async updateTotalRating(employeeId: number) {
    const employee = await this.employeeRepository.findByPk(employeeId);
    console.log(employee);
    const feedbacks = await employee.$get('feedbacks');
    console.log(feedbacks);

    const totalScore = feedbacks.reduce(
      (sum, feedback) => sum + feedback.score,
      0,
    );
    const totalRating = Math.ceil(totalScore / feedbacks.length);
    await employee.update({ totalRating });
    console.log(totalRating);
  }
}
