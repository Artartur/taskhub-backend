import { UserModel } from "../models/user.model";
import { CreateUserDTO } from "../dto/create-user.dto";

export class UsersRepository {
  public async create(data: CreateUserDTO) {
    return UserModel.create(data);
  }

  public async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}
