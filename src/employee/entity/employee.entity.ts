import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeCode: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  department: string;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture: string;
}
