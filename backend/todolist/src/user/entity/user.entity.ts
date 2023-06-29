import { Task } from "src/task/entity/task.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('user')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(type=>Task,(task)=>task.user,{eager:false})
    tasks:Task;
}