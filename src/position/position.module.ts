import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Position } from './position.model';

@Module({
  providers: [PositionService],
  controllers: [PositionController],
  imports: [SequelizeModule.forFeature([Position])],
})
export class PositionModule {}
