import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { task as Task } from './task.Entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    //conditional on filters
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status/:status')
  updateStatusById(
    @Param('id') id: string,
    @Param('status') updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Post()
  createTask(
    @Body()
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
