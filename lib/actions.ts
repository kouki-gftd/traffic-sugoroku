'use server';
import prisma from "./prisma";

export const addPlayer = async (name: string) => {
  await prisma.player.create({ data: { name } });
}