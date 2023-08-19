import { Injectable } from '@nestjs/common';
import { Feedback } from './feedback.model';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback) private feedbackRepository: typeof Feedback,
  ) {}

  async createFeedback(dto: CreateFeedbackDto) {
    const feedback = await this.feedbackRepository.create(dto);
    return feedback;
  }

  async getAllFeedbacks() {
    const Feedbacks = await this.feedbackRepository.findAll({
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return Feedbacks;
  }
  async getFeedbacksByEmployeeId(
    employeeId: number,
    page: number,
    perPage: number,
  ) {
    const offset = (page - 1) * perPage;
    const feedbacks = await this.feedbackRepository.findAndCountAll({
      where: { employeeId },
      include: { all: true },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      offset,
      limit: perPage,
    });
    const totalPages = Math.ceil(feedbacks.count / perPage);

    return {
      feedbacks: feedbacks.rows,
      totalPages: totalPages,
    };
  }
}
