import { CreateTaskDTO } from "../dto/create-task.dto";
import { TaskModel } from "../models/task.model";

export class TasksRepository {
  public async create(data: CreateTaskDTO) {
    return TaskModel.create(data);
  }

  public async getAllTask(userId: string) {
    return TaskModel.find({ userId });
  }

  public async getTaskById(taskId: string) {
    return TaskModel.findById(taskId);
  }

  public async updateTask(taskId: string, data: Partial<CreateTaskDTO>) {
    return TaskModel.findByIdAndUpdate(taskId, data, { new: true });
  }

  public async deleteTask(taskId: string) {
    return TaskModel.deleteOne({ _id: taskId });
  }
}
