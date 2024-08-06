import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface Params {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const existingConversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    await prisma.message.deleteMany({
        where: {
          conversationId: conversationId,
        },
      });

    const deleteConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deleteConversation);
  } catch (error) {
    console.log(error, 'ERROR_DELETING_CONVERSATION')
    return new NextResponse("Internal server error", { status: 500 });
  }
}
