import React from "react";

export const gameRules = [
  { players: 3, carCount: 1, moveSpaces: 4 },
  { players: 3, carCount: 2, moveSpaces: 1 },
  { players: 3, carCount: 3, moveSpaces: 0 },
  { players: 4, carCount: 1, moveSpaces: 4 },
  { players: 4, carCount: 2, moveSpaces: 2 },
  { players: 4, carCount: 3, moveSpaces: 1 },
  { players: 4, carCount: 4, moveSpaces: 0 },
  { players: 5, carCount: 1, moveSpaces: 4 },
  { players: 5, carCount: 2, moveSpaces: 2 },
  { players: 5, carCount: 3, moveSpaces: 1 },
  { players: 5, carCount: 4, moveSpaces: 1 },
  { players: 5, carCount: 5, moveSpaces: 0 },
  { players: 6, carCount: 1, moveSpaces: 4 },
  { players: 6, carCount: 2, moveSpaces: 3 },
  { players: 6, carCount: 3, moveSpaces: 2 },
  { players: 6, carCount: 4, moveSpaces: 1 },
  { players: 6, carCount: 5, moveSpaces: 0 },
  { players: 6, carCount: 6, moveSpaces: 0 },
  { players: 7, carCount: 1, moveSpaces: 4 },
  { players: 7, carCount: 2, moveSpaces: 3 },
  { players: 7, carCount: 3, moveSpaces: 2 },
  { players: 7, carCount: 4, moveSpaces: 1 },
  { players: 7, carCount: 5, moveSpaces: 1 },
  { players: 7, carCount: 6, moveSpaces: 0 },
  { players: 7, carCount: 7, moveSpaces: 0 },
  { players: 8, carCount: 1, moveSpaces: 4 },
  { players: 8, carCount: 2, moveSpaces: 3 },
  { players: 8, carCount: 3, moveSpaces: 2 },
  { players: 8, carCount: 4, moveSpaces: 2 },
  { players: 8, carCount: 5, moveSpaces: 1 },
  { players: 8, carCount: 6, moveSpaces: 1 },
  { players: 8, carCount: 7, moveSpaces: 0 },
  { players: 8, carCount: 8, moveSpaces: 0 },
];

export const calculateMoveSpaces = (playerCount: number, carCardCount: number): number => {
  const rule = gameRules.find(rule => rule.players === playerCount && rule.carCount ===carCardCount);
  return rule ? rule.moveSpaces : 0;
};