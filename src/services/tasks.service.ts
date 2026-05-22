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

  public async getTaskById(taskId: string) {
    return this.tasksRepository.getTaskById(taskId);
  }

  public async updateTask(
    taskId: string,
    userId: string,
    data: Partial<CreateTaskDTO>,
  ) {
    return this.tasksRepository.updateTask(taskId, userId, data);
  }

  public async deleteTask(taskId: string, userId: string) {
    return this.tasksRepository.deleteTask(taskId, userId);
  }
}
