import { connectDB } from "@/app/lib/connectDB";
import User from "@/models/uaerModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    await connectDB().then(() => console.log("DB Connected"));
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, "123456789", { expiresIn: "1d" });

    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
};
