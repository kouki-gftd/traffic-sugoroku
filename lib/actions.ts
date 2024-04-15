'use server';
import prisma from "./prisma";

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

export const addGameMode = async ( gameMode: string ): Promise<number> => {
  const createdGameMode = await prisma.gameModes.create({ data: {
    gameMode: gameMode,
  }});
  console.log(createdGameMode);
  return createdGameMode.id;
}

export const getPlayers = async () => {
  const players = await prisma.players.findMany();
  return players;
}

export const getCityId = async (cityName: string) => {
  const city = await prisma.cities.findFirst({
    where: {
      cityName: cityName,
    },
  });
  return city?.cityId;
};

export const getGameMode = async(id: number) => {
  const gameMode = await prisma.gameModes.findFirst({
    where: {
      id: id,
    },
  });
  return gameMode;
};

export const handleNextClick = async (cityName: string, gameModeId: number, publicTransport: string) =>
  {
    const gameModeData = await getGameMode(gameModeId);
    if (gameModeData !== null) {
      await prisma.rooms.create({
        data: {
          gameMode: gameModeData.gameMode,
          cityName: cityName,
          publicTransport: publicTransport
        },
      });
    } else {
      console.error(`Failed to get cityId for city:${cityName}`)
    }
  };