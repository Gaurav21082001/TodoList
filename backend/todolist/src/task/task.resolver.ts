import { JwtAuthGuard } from './../user/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { TaskInputType } from "./type/task.input.type";
import { TaskType } from "./type/task.type";
import { GetUser } from 'src/user/get.user.decorator';
import { User } from 'src/user/entity/user.entity';

@Resolver(() => TaskType)
@UseGuards(JwtAuthGuard)
export class TaskResolver {

  constructor(private taskService: TaskService) { }
  @Query(() => [TaskType])
  tasks(@GetUser('user') user: User) {
    return this.taskService.tasks(user.id);
  }

  // @Query(() => [TaskType])
  // tasks(){
  //   return this.taskService.tasks();
  // }

  @Mutation(() => TaskType)
  createTask(@GetUser('user') user: User,
    @Args('input') input: TaskInputType) {
    return this.taskService.createTask(user, input);
  }

  @Mutation(() => TaskType)
  completeTask(@GetUser('user') user: User, @Args('id') id: number) {
    return this.taskService.completeTask(user.id, id);
  }

  @Mutation(() => TaskType)
  deleteTask(@GetUser('user') user: User, @Args('id') id: number) {
    return this.taskService.deleteTask(user.id, id);
  }

}