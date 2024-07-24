import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const { name, email, password } = await request.json();

    if(!name || !email || !password) {
      return new NextResponse("Internal Error", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, ": REGISTRATION ERROR!");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
