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
  Query,
} from '@nestjs/common'

import { CreateSessionDto } from './dto/create-session.dto'
import { psychologicalDisorder } from './dto/Enum'
import { UpdateSessionDto } from './dto/update-session.dto'
import { SessionService } from './session.service'
import { SearchSession } from './dto/filterSession'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    await this.sessionService.create(createSessionDto)
    return {
      message: 'SESSION_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.CREATED,
    }
  }

  @Get()
  async getDisorders(@Query() filter: SearchSession) {
    return await this.sessionService.searchSession(filter)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.sessionService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    await this.sessionService.update(id, updateSessionDto)
    return {
      message: 'SESSION_UPDATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.sessionService.remove(id)
    return {
      message: 'SESSION_DELETED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }
}
