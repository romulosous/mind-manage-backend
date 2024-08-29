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
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

import { CreatePsychologistDto } from './dto/create-psychologist.dto'
import { UpdatePsychologistDto } from './dto/update-psychologist.dto'
import { PsychologistService } from './psychologist.service'

@Controller('psychologist')
// @UseGuards(JwtAuthGuard)
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPsychologistDto: CreatePsychologistDto) {
    await this.psychologistService.create(createPsychologistDto)
    return {
      message: 'PSYCHOLOGIST_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAll() {
    return await this.psychologistService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.psychologistService.findOne(Number(id))
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.psychologistService.remove(id)
    return {
      message: 'PSYCHOLOGIST_REMOVED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Post('/email')
  @HttpCode(HttpStatus.FOUND)
  async findByEmail(@Body('email') email: string) {
    return await this.psychologistService.findByEmail(email)
  }
}
