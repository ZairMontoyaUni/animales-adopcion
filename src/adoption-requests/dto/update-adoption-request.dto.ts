import { PartialType } from '@nestjs/swagger';
import { CreateAdoptionRequestDto } from './create-adoption-request.dto';
import { IsIn } from 'class-validator';

export class UpdateAdoptionRequestDto {

  @IsIn(['aprobada', 'rechazada'])
  status: string;
}