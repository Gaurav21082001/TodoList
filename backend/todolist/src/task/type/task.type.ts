import {ObjectType,Field,ID} from '@nestjs/graphql';
@ObjectType()
export class TaskType{

@Field(()=>ID)
id:number;

@Field()
title:string;

@Field()
details:string;

@Field()
isCompleted:boolean;

}