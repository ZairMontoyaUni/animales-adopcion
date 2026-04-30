import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { QueryAnimalsDto } from './dto/query-animals.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@ApiTags('animals')
@Controller('animals')
export class AnimalsController {
  constructor(
    private readonly animalsService: AnimalsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo animal' })
  @ApiBody({ type: CreateAnimalDto })
  @ApiResponse({ status: 201, description: 'Animal creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() dto: CreateAnimalDto) {
    return this.animalsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los animales' })
  @ApiResponse({ status: 200, description: 'Lista de animales obtenida' })
  findAll(@Query() query: QueryAnimalsDto) {
    return this.animalsService.findAll(query);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un animal por ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del animal' })
  @ApiResponse({ status: 200, description: 'Animal encontrado' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un animal' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del animal' })
  @ApiBody({ type: UpdateAnimalDto })
  @ApiResponse({ status: 200, description: 'Animal actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAnimalDto,
  ) {
    return this.animalsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un animal' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del animal' })
  @ApiResponse({ status: 200, description: 'Animal eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.remove(id);
  }
}
