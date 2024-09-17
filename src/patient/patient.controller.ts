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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthType } from 'src/auth/enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'

import { CreatePatientDto } from './dto/create-patient.dto'
import { SearchPatient } from './dto/filterPatient'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientService } from './patient.service'

@Controller('patient')
@Roles(AuthType.ADMIN, AuthType.PSYCHOLOGIST)
// @UseGuards(JwtAuthGuard)
@ApiTags('Patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a patient',
    description: 'This endpoint is used to create a new patient',
  })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createPatientDto: CreatePatientDto) {
    await this.patientService.create(createPatientDto)
    return {
      message: 'PATIENT_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.CREATED,
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Search for patients',
    description: 'This endpoint is used to search for patients with filters',
  })
  @ApiResponse({
    status: 200,
    description: 'The patients have been successfully listed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async search(@Query() filter: SearchPatient) {
    const limit = filter.limit || 10
    const courrentPage = filter.page || 1
    const offset = (courrentPage - 1) * limit

    filter.offset = offset
    filter.limit = limit

    return await this.patientService.searchPatients(filter)
  }

  @Get(':id')
  @Roles(AuthType.PSYCHOLOGIST, AuthType.PATIENT)
  async getById(@Param('id') id: string): Promise<any> {
    const idNumber = parseInt(id)
    return await this.patientService.findOne(idNumber)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a patient',
    description: "This endpoint is used to update a patient's information",
  })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Patient Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
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
  @ApiOperation({
    summary: 'Remove a patient',
    description: 'This endpoint is used to remove a patient by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully removed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Patient Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.patientService.remove(id)
    return {
      message: 'PATIENT_DELETED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Post('email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Find a patient by email',
    description: 'This endpoint is used to find a patient by email',
  })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully found',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Patient Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findByEmail(@Body() body: { email: string }) {
    return await this.patientService.findByEmail(body.email)
  }
}
