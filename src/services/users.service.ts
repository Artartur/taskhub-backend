import { UsersRepository } from "../repositories/users.repository";
import { CreateUserDTO } from "../dto/create-user.dto";

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  public async create(data: CreateUserDTO) {
    return this.usersRepository.create(data);
  }

  public async getUserEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }
}
