import { User } from 'src/user/entity/user.entity';
import { BaseEntity, ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('tasks')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    details: string;

    @Column({ default: 0 })
    isCompleted: number;

    @Column()
    userId: number;

    @ManyToOne(type => User, (user) => user.tasks, { eager: false })
    user: User;
}
