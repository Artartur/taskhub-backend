import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "../dto/create-user.dto";
import { LoginDTO } from "../dto/login.dto";

export class AuthService {
  constructor(private usersService: UsersService) {}

  public async login(login: LoginDTO) {
    const { email, password } = login;

    const user = await this.usersService.getUserEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { sub: user._id, email: user.email },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(
          process.env.JWT_EXPIRES_IN,
        ) as jwt.SignOptions["expiresIn"],
      },
    );

    return { token };
  }

  public async register(data: CreateUserDTO) {
    const existing = await this.usersService.getUserEmail(data.email);

    if (existing) throw new Error("Email already in use");

    const hashed = await bcrypt.hash(data.password, 10);

    data.password = hashed;

    return this.usersService.create(data);
  }
}
