import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repo';
import { task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const res = await this.taskRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const { status } = updateTaskStatusDto;
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  getTasks(getTasksWithFilters: GetTaskFilterDto): Promise<task[]> {
      return this.taskRepository.getTasks(getTasksWithFilters);
  }
}
