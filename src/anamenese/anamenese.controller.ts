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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

import { AnameneseService } from './anamenese.service'
import { CreateAnameneseDto } from './dto/create-anamenese.dto'
import { UpdateAnameneseDto } from './dto/update-anamenese.dto'

@Controller('anamenese')
// @UseGuards(JwtAuthGuard)
export class AnameneseController {
  constructor(private readonly anameneseService: AnameneseService) {}

  @Post()
  async create(@Body() createAnameneseDto: CreateAnameneseDto) {
    await this.anameneseService.create(createAnameneseDto)
    return {
      message: 'ANAEMENESE_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.CREATED,
    }
  }

  @Get()
  async findAll() {
    return await this.anameneseService.findAll({ limit: 10, offset: 0 })
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.anameneseService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnameneseDto: UpdateAnameneseDto,
  ) {
    await this.anameneseService.update(id, updateAnameneseDto)
    return {
      message: 'ANAMENESE_UPDATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.anameneseService.remove(id)
    return {
      message: 'ANAMENESE_DELETED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }
}
