import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/user/entity/user.entity";
import { Task } from "./entity/task.entity";
import { TaskInputType } from "./type/task.input.type";

@Injectable()
export class TaskService {
    async tasks(id: number) {
        return await Task.findBy({ userId: id });
    }
    // async tasks() {
    //     return await Task.find();
    // }

    async createTask(user: User, input: TaskInputType) {
        const task = new Task();
        const { title, details } = input;
        task.title = title;
        task.details = details;
        task.isCompleted = 0;
        task.user = user;
        await task.save()

        return task;

    }

    async completeTask(userId: number, id: number) {
        const task = await Task.findOneBy({ userId, id });
        if (!task) {
            throw new NotFoundException('Task not found');

        }
        task.isCompleted = 1;
        await task.save();
        return task;
    }

    async deleteTask(userId: number, id: number) {
        const task = await Task.findOneBy({ id });
        if (!task) {
            throw new NotFoundException('Task not found');

        }
        await task.remove()
        return task;
    }
}