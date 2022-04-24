import { Task } from "../entities/Task";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { UserInputError } from "apollo-server-express";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World!";
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return Task.find({});
  }

  @Query(() => Task, { nullable: true })
  task(
    @Arg("id", () => Int)
    id: number
  ): Promise<Task | null> {
    return Task.findOne({ where: { id } });
  }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String)
    title: string
  ): Promise<Task> {
    return Task.create({ title, isComplete: false }).save();
  }

  @Mutation(() => Boolean)
  deleteTask(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      Task.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("id", () => Int)
    id: number,

    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ): Promise<Task | null> {
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      throw new UserInputError(`Task with id ${id} not found`);
    }
    try {
      Task.update({ id }, { isComplete });
      return task;
    } catch {
      throw new Error("Error updating task");
    }
  }
}
