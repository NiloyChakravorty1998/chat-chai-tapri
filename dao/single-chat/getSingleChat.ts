import { SingleChat } from "../../server/models/ChatModel";
import { UserModel } from "../../server/models/UserModel";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLastChats(user: UserModel) {
    const lastFiveChats: SingleChat[] = [];
    const result = await prisma.chat.findMany({
        orderBy: [{
            sentTimestamp: 'desc'
        }],
        where: {
            OR: [
                { fromUserId: user.userId },
                { toUserId: user.userId },
            ],
        },
        take: 5, 
    });

    result.forEach((chat) => {
        lastFiveChats.push({
            toUserId: chat.toUserId,
            fromUserId: chat.fromUserId!,
            lastText: chat.lastText,
            sentTimestamp: chat.sentTimestamp.toString()
        });
    });
    return lastFiveChats;
}
