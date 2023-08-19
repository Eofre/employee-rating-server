import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Feedback } from 'src/feedback/feedback.model';
import { Position } from 'src/position/position.model';

interface EmployeeCreationAttrs {
  firstName: string;
  lastName: string;
  middleName: string;
  positionId: number;
  photo: any;
}

@Table({ tableName: 'employee' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  middleName: string;

  @Column({ type: DataType.STRING, unique: true })
  photo: string;

  @ForeignKey(() => Position)
  @Column({ type: DataType.INTEGER, allowNull: false })
  positionId: number;

  @BelongsTo(() => Position)
  position: Position;

  @HasMany(() => Feedback)
  feedbacks: Feedback[];

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  totalRating: number;
}
