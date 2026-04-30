import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @IsString()
  @ApiProperty({ example: 'Refugio Patitas Felices', description: 'Nombre de la ubicación' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Medellín', description: 'Ciudad' })
  city: string;

  @IsString()
  @ApiProperty({ example: 'Calle 10 #43-25', description: 'Dirección' })
  address: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '3041111111', description: 'Teléfono' })
  phone?: string;
}