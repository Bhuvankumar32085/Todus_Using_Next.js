import { connectDB } from "@/app/lib/connectDB";
import User from "@/models/uaerModel";
import bcrypt from "bcryptjs";

connectDB().then(() => console.log("DB Connected"));

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    if (!user) {
      return Response.json({ error: "Failed to create user" }, { status: 500 });
    }

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
};
