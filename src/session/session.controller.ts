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
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

import { CreateSessionDto } from './dto/create-session.dto'
import { SearchSession } from './dto/filterSession'
import { UpdateSessionDto } from './dto/update-session.dto'
import { SessionService } from './session.service'

@Controller('session')
// @UseGuards(JwtAuthGuard)
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
    const limit = 10
    const courrentPage = filter.page || 1
    const offset = (courrentPage - 1) * limit

    filter.offset = offset
    filter.limit = limit

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
