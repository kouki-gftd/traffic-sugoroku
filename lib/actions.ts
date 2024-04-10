'use server';
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export const addPlayer = async (playerName: string) => {

  const existingPlayer = await prisma.players.findUnique({
    where: {
      playerName: playerName,
    },
  });

  if (existingPlayer) {
    throw new Error('NAME_ALREADY_EXISTS');
  }

  await prisma.players.create({ data: { playerName } });
}

export const addGameMode = async ( gameMode: string ) => {
  await prisma.gameModes.create({ data: {
    gameMode: gameMode,
  }});
}

export const getPlayers = async () => {
  const players = await prisma.players.findMany();
  return players;
}