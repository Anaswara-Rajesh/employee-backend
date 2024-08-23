import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService, MailService],
  controllers: [EmployeeController],
  exports: [EmployeeService, ]
})
export class EmployeeModule {}
