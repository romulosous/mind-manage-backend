import { PartialType } from '@nestjs/mapped-types';
import { CreateAnameneseDto } from './create-anamenese.dto';

export class UpdateAnameneseDto extends PartialType(CreateAnameneseDto) {}
