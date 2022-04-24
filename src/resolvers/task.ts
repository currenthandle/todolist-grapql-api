import { Task } from "../entities/Task";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

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
}
