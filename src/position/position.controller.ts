import { Body, Controller, Get, Post } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';

@Controller('position')
export class PositionController {
  constructor(private positionService: PositionService) {}

  @Post()
  create(@Body() dto: CreatePositionDto) {
    return this.positionService.createPosition(dto);
  }

  @Get()
  getAll() {
    return this.positionService.getAllPositions();
  }
}
