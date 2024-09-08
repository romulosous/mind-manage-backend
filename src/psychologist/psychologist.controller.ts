import { CreatePsychologistDto } from './dto/create-psychologist.dto'
import { UpdatePsychologistDto } from './dto/update-psychologist.dto'
import { PsychologistService } from './psychologist.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthType } from 'src/auth/enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'

@Controller('psychologist')
@ApiTags('Psychologist')
// @UseGuards(JwtAuthGuard)
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a psychologist',
    description: 'This endpoint is used to create a psychologist',
  })
  @ApiResponse({
    status: 201,
    description: 'The psychologist has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createPsychologistDto: CreatePsychologistDto) {
    await this.psychologistService.create(createPsychologistDto)
    return {
      message: 'PSYCHOLOGIST_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Get()
  @Roles(AuthType.ADMIN)
  @ApiOperation({
    summary: 'List all psychologists',
    description: 'This endpoint is used to list all psychologists',
  })
  @ApiResponse({
    status: 200,
    description: 'The psychologists have been successfully listed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    return await this.psychologistService.findAll()
  }

  @Get(':id')
  @Roles(AuthType.PSYCHOLOGIST, AuthType.ADMIN)
  @ApiOperation({
    summary: 'Find a psychologist by id',
    description: 'This endpoint is used to find a psychologist by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The psychologist has been successfully found',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.psychologistService.findOne(Number(id))
  }

  @Put(':id')
  @Roles(AuthType.PSYCHOLOGIST, AuthType.ADMIN)
  @ApiOperation({
    summary: 'Update a psychologist',
    description: 'This endpoint is used to update a psychologist',
  })
  @ApiResponse({
    status: 200,
    description: 'The psychologist has been successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePsychologistDto: UpdatePsychologistDto,
  ) {
    await this.psychologistService.update(id, updatePsychologistDto)
    return {
      message: 'PSYCHOLOGIST_UPDATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Delete(':id')
  @Roles(AuthType.ADMIN)
  @ApiOperation({
    summary: 'Remove a psychologist',
    description: 'This endpoint is used to remove a psychologist',
  })
  @ApiResponse({
    status: 200,
    description: 'The psychologist has been successfully removed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.psychologistService.remove(id)
    return {
      message: 'PSYCHOLOGIST_REMOVED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }
  @ApiOperation({
    summary: 'Find a psychologist by email',
    description: 'This endpoint is used to find a psychologist by email',
  })
  @ApiResponse({
    status: 200,
    description: 'The psychologist has been successfully found',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/email')
  @Roles(AuthType.PSYCHOLOGIST, AuthType.ADMIN)
  async findByEmail(@Body('email') email: string) {
    return await this.psychologistService.findByEmail(email)
  }
}
