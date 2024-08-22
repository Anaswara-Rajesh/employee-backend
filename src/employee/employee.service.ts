import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from './entity/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private mailService: MailService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    employee.password = await bcrypt.hash(employee.password, 10);
    await this.employeeRepository.save(employee);

    const emailSubject = 'Welcome to Our Company';
    const emailText = `Dear ${employee.firstName},\n\nYour account has been created. Your username is: ${employee.username} and Your password is: ${createEmployeeDto.password}. \n\nBest Regards,\nCompany`;
    await this.mailService.sendMail(employee.email, emailSubject, emailText);

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
    console.log(id, updateEmployeeDto);

    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    return this.employeeRepository.delete(id).then(() => undefined);
  }
}
