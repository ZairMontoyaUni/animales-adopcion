# 📚 Configuración de Swagger - API Adopción de Animales

## ✅ Implementación Completada

Se ha implementado exitosamente **Swagger UI** en el proyecto NestJS para documentar automáticamente la API REST.

---

## 🎯 Qué se instaló

### 1. Paquetes NPM

```bash
npm install @nestjs/swagger swagger-ui-express
```

Se instalaron dos paquetes principales:

- **@nestjs/swagger**: Módulo oficial de NestJS para integración con Swagger
- **swagger-ui-express**: Interfaz web para visualizar la documentación

---

## 🔧 Cambios Realizados

### 1. **main.ts** - Configuración de Swagger

Se agregó la configuración de Swagger en el archivo de inicio:

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// ... dentro de la función bootstrap()

// Configuración de Swagger
const config = new DocumentBuilder()
  .setTitle('API Adopción de Animales')
  .setDescription('API para la gestión de adopción de animales')
  .setVersion('1.0')
  .addTag('animals', 'Endpoints para gestionar animales')
  .addTag('locations', 'Endpoints para gestionar ubicaciones')
  .addTag('users', 'Endpoints para gestionar usuarios')
  .addTag('favorites', 'Endpoints para gestionar favoritos')
  .addTag('seeder', 'Endpoints para poblar la base de datos')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);

logger.log(`Swagger en http://localhost:${port}/api/docs`);
```

### 2. **Controladores** - Decoradores de Swagger

Se agregaron decoradores de Swagger a todos los controladores:

#### app.controller.ts

```typescript
@ApiOperation({ summary: 'Obtener mensaje de bienvenida' })
@ApiResponse({ status: 200, description: 'Mensaje de bienvenida obtenido correctamente' })
```

#### animals.controller.ts

```typescript
@ApiTags('animals')  // Agrupa bajo la etiqueta "animals"
@ApiOperation({ summary: 'Crear un nuevo animal' })
@ApiBody({ type: CreateAnimalDto })
@ApiResponse({ status: 201, description: 'Animal creado exitosamente' })
@ApiResponse({ status: 400, description: 'Datos inválidos' })
@ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del animal' })
```

#### locations.controller.ts

```typescript
@ApiTags('locations')
@ApiOperation({ summary: 'Crear una nueva ubicación' })
@ApiBody({ type: CreateLocationDto })
@ApiResponse({ status: 201, description: 'Ubicación creada exitosamente' })
```

#### users.controller.ts

```typescript
@ApiTags('users')
@ApiOperation({ summary: 'Crear un nuevo usuario' })
@ApiBody({ type: CreateUserDto })
@ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
@ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del usuario' })
// También incluye endpoints de favoritos con @ApiTags('favorites')
```

#### seeder.controller.ts (NUEVO)

```typescript
@ApiTags('seeder')
@ApiOperation({ summary: 'Poblar la base de datos con datos de prueba' })
@ApiResponse({ status: 201, description: 'Base de datos poblada exitosamente' })
```

### 3. **DTOs** - Decoradores de Propiedades

Se agregaron decoradores `@ApiProperty` a los DTOs para documentar las propiedades:

#### create-animal.dto.ts

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Luna', description: 'Nombre del animal' })
  nombre: string;

  @ApiProperty({ example: 'perro', description: 'Especie del animal' })
  especie: string;

  @ApiProperty({ example: 18, description: 'Edad del animal en meses' })
  edad: number;

  @ApiPropertyOptional({
    example: 'disponible',
    description: 'Estado del animal',
  })
  estado?: string;

  // ... más propiedades
}
```

#### create-location.dto.ts

```typescript
@ApiProperty({ example: 'Refugio Patitas Felices', description: 'Nombre de la ubicación' })
name: string;

@ApiProperty({ example: 'Medellín', description: 'Ciudad' })
city: string;

@ApiPropertyOptional({ example: '3041111111', description: 'Teléfono' })
phone?: string;
```

#### create-user.dto.ts

```typescript
@ApiProperty({ example: 'Carlos Pérez', description: 'Nombre del usuario' })
name: string;

@ApiProperty({ example: 'carlos@demo.com', description: 'Email del usuario' })
email: string;

@ApiPropertyOptional({ example: '3101111111', description: 'Teléfono del usuario' })
phone?: string;
```

---

## 🚀 Cómo Usar Swagger

### Pasos para Ejecutar:

1. **Iniciar Docker Compose** (si no está corriendo):

```bash
docker-compose up -d
```

2. **Instalar dependencias** (si es la primera vez):

```bash
npm install
```

3. **Iniciar el servidor**:

```bash
npm run start:dev
```

4. **Abrir Swagger en el navegador**:

```
http://localhost:3000/api/docs
```

### En Swagger UI podrás:

- ✅ Ver todos los endpoints de la API
- ✅ Leer las descripciones de cada operación
- ✅ Probar los endpoints directamente desde el navegador
- ✅ Ver los DTOs con ejemplos de datos
- ✅ Entender los códigos de respuesta HTTP

---

## 📋 Endpoints Documentados

### Animals (Animales)

- `POST /api/animals` - Crear nuevo animal
- `GET /api/animals` - Obtener todos los animales
- `GET /api/animals/:id` - Obtener animal por ID
- `PATCH /api/animals/:id` - Actualizar animal
- `DELETE /api/animals/:id` - Eliminar animal

### Locations (Ubicaciones)

- `POST /api/locations` - Crear nueva ubicación
- `GET /api/locations` - Obtener todas las ubicaciones
- `GET /api/locations/:id` - Obtener ubicación por ID
- `PATCH /api/locations/:id` - Actualizar ubicación
- `DELETE /api/locations/:id` - Eliminar ubicación

### Users (Usuarios)

- `POST /api/users` - Crear nuevo usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PATCH /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `POST /api/users/:id/favorites/:animalId` - Agregar animal a favoritos
- `GET /api/users/:id/favorites` - Obtener favoritos del usuario
- `DELETE /api/users/:id/favorites/:animalId` - Eliminar de favoritos

### Seeder (Poblado de BD)

- `POST /api/seeder/seed` - Poblar la base de datos con datos de prueba

---

## 🎨 Características de Swagger

### Validación de Datos

Swagger muestra automáticamente los validadores de clase:

- `@IsString()` - Texto requerido
- `@IsEmail()` - Email válido
- `@IsInt()` - Número entero
- `@IsUUID()` - UUID válido
- `@IsOptional()` - Campo opcional

### Respuestas HTTP

Cada endpoint documenta:

- **200/201**: Éxito
- **400**: Datos inválidos
- **404**: Recurso no encontrado
- Descripciones claras para cada respuesta

### Ejemplos de Datos

Los DTOs incluyen ejemplos de datos que Swagger muestra en la interfaz:

```json
{
  "nombre": "Luna",
  "especie": "perro",
  "edad": 18,
  "descripcion": "Labrador dorada, cariñosa y muy activa",
  "estado": "disponible",
  "contacto": "patitas@demo.com"
}
```

---

## 📝 Archivos Modificados

1. ✅ `src/main.ts` - Configuración de Swagger
2. ✅ `src/app.controller.ts` - Decoradores Swagger
3. ✅ `src/animals/animals.controller.ts` - Decoradores Swagger
4. ✅ `src/animals/dto/create-animal.dto.ts` - ApiProperty decoradores
5. ✅ `src/locations/locations.controller.ts` - Decoradores Swagger
6. ✅ `src/locations/dto/create-location.dto.ts` - ApiProperty decoradores
7. ✅ `src/users/users.controller.ts` - Decoradores Swagger
8. ✅ `src/users/dto/create-user.dto.ts` - ApiProperty decoradores
9. ✅ `src/seeder/seeder.controller.ts` - NUEVO - Controlador del Seeder
10. ✅ `src/seeder/seeder.module.ts` - Se agregó SeederController
11. ✅ `package.json` - Se instalaron dependencias

---

## 🔍 Pruebas Rápidas en Swagger

Desde la interfaz de Swagger puedes:

1. **Expandir una operación** haciendo clic en ella
2. **Hacer clic en "Try it out"**
3. **Llenar los parámetros** requeridos
4. **Hacer clic en "Execute"**
5. **Ver la respuesta** incluyendo el código HTTP y el cuerpo de la respuesta

---

## 📚 Recursos Adicionales

- **Documentación oficial**: https://docs.nestjs.com/openapi/introduction
- **Decoradores disponibles**:
  - `@ApiTags()` - Agrupar endpoints
  - `@ApiOperation()` - Describir la operación
  - `@ApiProperty()` - Documentar propiedades
  - `@ApiResponse()` - Documentar respuestas
  - `@ApiParam()` - Documentar parámetros
  - `@ApiBody()` - Documentar cuerpo de solicitud

---

## ✨ Conclusión

La implementación de Swagger está **100% completa**. Ahora tienes:

- ✅ Documentación automática de la API
- ✅ Interfaz interactiva para probar endpoints
- ✅ Especificación OpenAPI completa
- ✅ Ejemplos de datos en cada operación
- ✅ Validaciones documentadas

¡Tu API está lista para ser documentada y utilizada por otros desarrolladores!
