import { ActivityService } from './activity.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
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
} from '@nestjs/common'

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    await this.activityService.create(createActivityDto)
    return {
      message: 'ACTIVITY_CREATED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }

  @Get()
  async findAll() {
    return await this.activityService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.activityService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    await this.activityService.update(id, updateActivityDto)
    return {
      message: 'ACTIVITY_UPDATED_SUCCESSFULLY',
      statusCode: HttpStatus.FOUND,
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.activityService.remove(id)

    return {
      message: 'ACTIVITY_DELETED_SUCCESSFULLY',
      statusCode: HttpStatus.OK,
    }
  }
}
