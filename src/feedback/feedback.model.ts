import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employee/employee.model';

interface FeedbackCreationAttrs {
  score: number;
  comment: string;
  employeeId: number;
}

@Table({ tableName: 'feedback' })
export class Feedback extends Model<Feedback, FeedbackCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  score: number;

  @Column({ type: DataType.STRING, allowNull: false })
  comment: string;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employeeId: number;

  // @BelongsTo(() => Employee)
  // employee: Employee;
}
