import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("123456789");

export async function verifyAuth(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId;
  } catch (err) {
    return null;
  }
}
