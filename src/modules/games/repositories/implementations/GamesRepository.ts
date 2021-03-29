import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  // SELECT NOME, SEXO, ENDERECO FROM CLIENTE
  // WHERE 
  // SEXO = 'M' OR ENDERECO LIKE '%RJ';

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("title ilike :title", {title:`%${param}%`})
      .getMany();
    
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = this.repository.query("SELECT COUNT(*) FROM games");
    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
    .createQueryBuilder()
      .relation(Game, "users")
      .of(id)
      .loadMany();

    // const user = await createQueryBuilder("user")
    // .leftJoinAndSelect("user.photos", "photo")
    // .where("user.name = :name", { name: "Timber" })
    // .getOne();
      
      // const user = await this.repository.findOneOrFail({ relations: ['games'], where: { id: user_id } });
      // return user;
  }
}
