import React from "react";
import { calculateMoveSpaces } from "./Gamerules";

type CalculateCarMoveSpacesProps = {
  playerCount:  number;
  carCardCount: number;
};

const CalculateCarMoveSpaces: React.FC<CalculateCarMoveSpacesProps> = ({ playerCount, carCardCount }) => {
  // プレイヤー数と車カードの枚数に基づいて進むマス数を計算する関数
  return (
    <div>
      +{calculateMoveSpaces(playerCount, carCardCount)}
    </div>
  );
};

export default CalculateCarMoveSpaces;