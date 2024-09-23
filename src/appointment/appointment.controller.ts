import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { AuthType } from 'src/auth/enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'

import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { SearchAppointment } from './dto/filterAppointment'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Controller('appointment')
// @Roles(AuthType.ADMIN, AuthType.PSYCHOLOGIST)
// @UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @Roles(AuthType.PSYCHOLOGIST, AuthType.PATIENT)
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: Request,
  ) {
    const token = req.cookies['access_token']

    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    }) as { sub: number }
    const psychologistId = decodedToken?.sub

    if (!psychologistId) {
      throw new HttpException(
        `PSYCHOLOGIST_UNAUTHORIZED`,
        HttpStatus.UNAUTHORIZED,
      )
    }

    createAppointmentDto.psychologistId = psychologistId

    await this.appointmentService.create(createAppointmentDto)
    return {
      message: 'APPOINTMENT_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Get()
  @Roles(AuthType.PSYCHOLOGIST, AuthType.PATIENT)
  async searchAppointment(
    @Query() filter: SearchAppointment,
    // @Req() req: Request,
  ) {
    const limit = filter.limit || 10
    const courrentPage = filter.page || 1
    const offset = (courrentPage - 1) * limit

    // const token = req.cookies['access_token'] TODO: Fix this

    // const decodedToken = this.jwtService.verify(token, {
    //   secret: process.env.JWT_SECRET,
    // }) as { sub: number }
    // const psychologistId = decodedToken?.sub

    // if (!psychologistId) {
    //   throw new HttpException(
    //     `PSYCHOLOGIST_UNAUTHORIZED`,
    //     HttpStatus.UNAUTHORIZED,
    //   )
    // }

    // filter.psychologistId = psychologistId

    filter.offset = offset
    filter.limit = limit

    return await this.appointmentService.searchAppointment(filter)
  }

  @Get('report')
  @Roles(AuthType.PSYCHOLOGIST)
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
