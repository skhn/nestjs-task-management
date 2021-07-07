import { query } from 'express';
import { EntityRepository, Repository } from 'typeorm';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { task } from './task.entity';

@EntityRepository(task)
export class TaskRepository extends Repository<task> {
  async getTasks(filterDto: GetTaskFilterDto): Promise<task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIkE LOWER(:search)',

        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
