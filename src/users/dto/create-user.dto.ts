import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Carlos Pérez', description: 'Nombre del usuario' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'carlos@demo.com', description: 'Email del usuario' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '3101111111', description: 'Teléfono del usuario' })
  phone?: string;
}