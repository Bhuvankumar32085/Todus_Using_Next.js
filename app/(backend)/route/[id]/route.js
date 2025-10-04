import { connectDB } from "@/app/lib/connectDB";
import { verifyAuth } from "@/app/lib/verifyAuth";
import Todo from "@/models/todoModel";
import User from "@/models/uaerModel";

export const GET = async (req, { params }) => {
  connectDB().then(() => console.log("DB Connected"));
  const userId = await verifyAuth(req);
  const { id } = await params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return Response.json(`id ${id} not found`, { status: 404 });
  }
  return Response.json(todo);
};

export const PUT = async (req, { params }) => {
  const { id } = await params;
  const { title } = await req.json();
  const todo = await Todo.findById(id);
  if (!todo) {
    return Response.json(`id ${id} not found`, { status: 404 });
  }

  todo.title = title;
  todo.completed = false;
  await todo.save();
  const userId = await verifyAuth(req);
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const user = await User.findById(userId).populate("todos");
  if (!user) {
    return Response.json("User not found", { status: 404 });
  }
  const todos = user.todos;
  return Response.json(
    { message: `todo with id ${id} updated`, data: todos },
    { status: 200 }
  );
};

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const { completed } = await req.json();

  const todu = await Todo.findById(id);
  if (!todu) {
    return Response.json(`id ${id} not found`, { status: 404 });
  }
  todu.completed = completed;
  await todu.save();

  const userId = await verifyAuth(req);
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const user = await User.findById(userId).populate("todos");
  if (!user) {
    return Response.json("User not found", { status: 404 });
  }
  const todos = user.todos;
  return Response.json(
    { message: `todo with id ${id} updated`, data: todos },
    { status: 200 }
  );
};

export const DELETE = async (req, { params }) => {
  const { id } = await params;

  const todu = await Todo.findByIdAndDelete(id);
  if (!todu) {
    return Response.json(`id ${id} not found`, { status: 404 });
  }

   const userId = await verifyAuth(req);
  if (!userId) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const user = await User.findById(userId).populate("todos");
  if (!user) {
    return Response.json("User not found", { status: 404 });
  }
  user.todos.pull(id);
  await user.save();
  const todos = user.todos;

  return Response.json(
    { message: `todo with id ${id} deleted`, data: todos },
    { status: 200 }
  );
};
