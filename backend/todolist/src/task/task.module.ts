import { Task } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskResolver, TaskService],
})
export class TaskModule {

}
