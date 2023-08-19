import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('feedback')
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService,
    private employeeService: EmployeeService,
  ) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    const feedback = this.feedbackService.createFeedback(dto);
    this.employeeService.updateTotalRating(dto.employeeId);
    return feedback;
  }

  @Get()
  getAll() {
    return this.feedbackService.getAllFeedbacks();
  }

  @Get(':employeeId')
  getFeedbacksByEmployeeId(
    @Param('employeeId') employeeId: number,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 3,
  ) {
    return this.feedbackService.getFeedbacksByEmployeeId(
      employeeId,
      page,
      perPage,
    );
  }
}
