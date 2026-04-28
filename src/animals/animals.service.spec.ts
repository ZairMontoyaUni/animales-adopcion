import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Location } from '../locations/entities/location.entity';
import { User } from '../users/entities/user.entity';

describe('AnimalsService', () => {
  let service: AnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        { provide: getRepositoryToken(Animal), useValue: {} },
        { provide: getRepositoryToken(Location), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
