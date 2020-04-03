import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateGenerationDto } from './dto/create-generation.dto';
import { Generation } from './generation.entity';

@Injectable()
export class GenerationService {
  constructor(
    @InjectRepository(Generation)
    private readonly generationRepository: Repository<Generation>,
  ) {}

  create(createGenerationDto: CreateGenerationDto): Promise<Generation> {
    const generation = new Generation();
    generation.expiration = createGenerationDto.expiration;
    return this.generationRepository.save(generation);
  }

  async getLastGeneration(): Promise<Generation> {
    const generations = await this.generationRepository.find();
    return generations[generations.length - 1];
  }
}