import { CreateTaskDTO } from "../dto/create-task.dto";
import { TasksRepository } from "../repositories/tasks.repository";

export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  public async createTask(data: CreateTaskDTO) {
    return this.tasksRepository.create(data);
  }

  public async getAllTasks(userId: string) {
    return this.tasksRepository.getAllTask(userId);
  }

  public async getTaskById(taskId: unknown) {
    return this.tasksRepository.getTaskById(taskId as string);
  }

  public async updateTask(taskId: unknown, data: Partial<CreateTaskDTO>) {
    return this.tasksRepository.updateTask(taskId as string, data);
  }

  public async deleteTask(taskId: unknown) {
    return this.tasksRepository.deleteTask(taskId as string);
  }
}
