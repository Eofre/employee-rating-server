import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Employee } from 'src/employee/employee.model';

interface PositionCreationAttrs {
  name: string;
}

@Table({ tableName: 'position' })
export class Position extends Model<Position, PositionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Employee)
  employees: Employee[];
}
