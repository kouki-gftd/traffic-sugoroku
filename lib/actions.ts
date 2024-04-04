'use server';
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export const addPlayer = async (playerName: string) => {
  await prisma.players.create({ data: { playerName } });
}

export const addGameMode = async (gameMode: string) => {
  await prisma.rooms.create({ data: {
    gameMode:         gameMode,
    city:            'defaultCity',
    publicTransport: 'defaultTransport'
  }});
}