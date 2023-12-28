import { SingleChat } from "../../server/models/ChatModel";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveChat(chat: SingleChat) {
    const result = await prisma.chat.create({
        data: {
            fromUserId: chat.fromUserId,
            toUserId: chat.toUserId,
            lastText: chat.lastText,
            sentTimestamp: new Date(chat.sentTimestamp),
        },
    });

    return result;
}
