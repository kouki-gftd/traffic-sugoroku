import React, { useEffect } from "react";

type playerData = {
  name:  string;
  color: string;
  cardHistory: string[];
  stepsHistory: number[];
  totalco2: number;
};

type PlayerRankingProps = {
  players: playerData[];
  onRankedPlayers: (rankedPlayers: playerData[]) => void;
};

const PlayerRanking: React.FC<PlayerRankingProps> = ({ players, onRankedPlayers }) => {
  // プレイヤーをcardHistoryの長さでソートして順位を計算
  useEffect(() => {
    const ranked = players.slice().sort((a, b) => {
  // cardHistoryの長さが同じならCo2排出量の少ない方が優先するロジックを実装
      if (a.cardHistory.length === b.cardHistory.length) {
        return a.totalco2 - b.totalco2;
      }
      return a.cardHistory.length - b.cardHistory.length;
    });
    onRankedPlayers(ranked);
  }, [players, onRankedPlayers]);

  return null;
};

export default PlayerRanking;