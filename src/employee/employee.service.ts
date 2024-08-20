import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from './entity/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    employee.password = await bcrypt.hash(employee.password, 10);
    await this.employeeRepository.save(employee);
    return employee;
  }

  findAll(department?: string): Promise<Employee[]> {
    if (department) {
      return this.employeeRepository.find({ where: { department } });
    }
    return this.employeeRepository.find();
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.employeeRepository.delete(id).then(() => undefined);
  }
}
