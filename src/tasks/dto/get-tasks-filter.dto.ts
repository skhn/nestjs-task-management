import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";
import { UpdateTaskStatusDto } from "./update-task-status.dto";

export class GetTaskFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsString()
    @IsOptional()
    search?: string;
}