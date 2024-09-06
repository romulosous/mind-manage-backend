import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

import { CreatePatientDto } from './dto/create-patient.dto'
import { SearchPatient } from './dto/filterPatient'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientService } from './patient.service'

@Controller('patient')
// @UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    await this.patientService.create(createPatientDto)
    return {
      message: 'PATIENT_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Get()
  async search(@Query() filter: SearchPatient) {
    return await this.patientService.searchPatients(filter)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    await this.patientService.update(id, updatePatientDto)
    return {
      message: 'PATIENT_UPDATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.patientService.remove(id)

    return {
      message: 'PATIENT_DELETED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Post('email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Body() body: { email: string }) {
    return await this.patientService.findByEmail(body.email)
  }
}
