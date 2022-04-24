import { Task } from "../entities/Task";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World!";
  }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String)
    title: string
  ): Promise<Task> {
    return Task.create({ title, isComplete: false }).save();
  }
}
