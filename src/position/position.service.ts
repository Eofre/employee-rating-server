import { Injectable } from '@nestjs/common';
import { Position } from './position.model';
import { CreatePositionDto } from './dto/create-position.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position) private positionRepository: typeof Position,
  ) {}

  async createPosition(dto: CreatePositionDto) {
    const position = await this.positionRepository.create(dto);
    return position;
  }

  async getAllPositions() {
    const positions = await this.positionRepository.findAll({
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return positions;
  }
}
