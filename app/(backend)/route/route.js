import { connectDB } from "@/app/lib/connectDB";
import { verifyAuth } from "@/app/lib/verifyAuth";
import Todo from "@/models/todoModel";
import User from "@/models/uaerModel";

export async function GET(req) {
 await connectDB().then(() => console.log("DB Connected"));
  const userId = await verifyAuth(req);
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const user = await User.findById(userId).populate("todos");
  if (!user) {
    return Response.json("User not found", { status: 404 });
  }
  const todos = user.todos;
  if (!todos || todos.length === 0) {
    return Response.json("No todos found", { status: 404 });
  }
  return Response.json(todos);
}

export const POST = async (req) => {
  await connectDB().then(() => console.log("DB Connected"));
  const userId = await verifyAuth(req);
  const body = await req.json();

  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  if (!body) {
    return Response.json("body is missing", { status: 400 });
  }

  const user = await User.findById(userId);
  if (!user) {
    return Response.json("User not found", { status: 404 });
  }

  const todo = await Todo.create({
    title: body.title,
    completed: false,
  });
  if (!todo) {
    return Response.json("Failed to create todo", { status: 500 });
  }
  user.todos.push(todo._id);
  await user.save();
  await user.populate("todos");
  const todos = user.todos;
  return Response.json(
    { message: `todo created id ${todo.id}`, data: todos },
    { status: 201 }
  );
};
