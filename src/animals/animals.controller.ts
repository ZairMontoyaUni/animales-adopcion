import {
  Controller, Post, Param, UploadedFile, UseInterceptors,
  ParseUUIDPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,
  Body,
  Delete,
  Get,
  Patch,
  Query,
} from '@nestjs/common';import { QueryAnimalsDto } from './dto/query-animals.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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


  @Post(':id/imagen')
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiOperation({ summary: 'Subir imagen de un animal' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del animal' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen (JPEG, PNG o WebP, máx 2 MB)',
        },
      },
      required: ['imagen'],
    },
  })
  @ApiResponse({ status: 200, description: 'Imagen subida exitosamente', schema: {
    example: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nombre: 'Luna',
      especie: 'perro',
      edad: 3,
      estado: 'disponible',
      imagen: 'https://res.cloudinary.com/miapp/image/upload/v1234567890/animales-adopcion/abc123.jpg',
    }
  }})
  @ApiResponse({ status: 400, description: 'Archivo inválido' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  uploadImagen(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),  // 2 MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    ) file: Express.Multer.File,

  ) {
    return this.animalsService.uploadImagen(id, file);
  }
}
