import { UsersRepository } from "./repositories/users.repository";
import { TasksRepository } from "./repositories/tasks.repository";
import { UsersService } from "./services/users.service";
import { TasksService } from "./services/tasks.service";
import { AuthService } from "./services/auth.service";

const usersRepository = new UsersRepository();
const tasksRepository = new TasksRepository();

export const usersService = new UsersService(usersRepository);
export const tasksService = new TasksService(tasksRepository);
export const authService = new AuthService(usersService);
