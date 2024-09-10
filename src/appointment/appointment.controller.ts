import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'

import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { SearchAppointment } from './dto/filterAppointment'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    await this.appointmentService.create(createAppointmentDto)
    return {
      message: 'APPOINTMENT_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Get()
  async searchAppointment(@Query() filter: SearchAppointment) {
    return await this.appointmentService.searchAppointment(filter)
  }

  @Get('report')
  async report(@Query() filter: SearchAppointment) {
    return await this.appointmentService.report(filter)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    await this.appointmentService.update(id, updateAppointmentDto)
    return {
      message: 'APPOINTMENT_UPDATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentService.remove(id)
  }
}
