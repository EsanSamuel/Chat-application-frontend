import prisma from "../../lib/prismadb";
import getSession from "./getSession";
//import { Session } from "next-auth";
import { User } from "@prisma/client";

interface Session {
  user: {
    email?: string;
    image?: string;
    name?: string;
  } | null;
}

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    console.log("Session:", session);
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    console.log(currentUser);
    return currentUser;
  } catch (error) {
    console.log('Something went wrong!')
    return null;
  }
};

export default getCurrentUser;
