import React from "react";
import CalculateCarMoveSpaces from "./CalculateCarMoveSpaces";

type Player = {
  id: number;
  playerName: string;
};

type Props = {
  players: Player[];
  selectedCards: { [id: number]: string };
};

const calculateImageSize = (numPlayers: number) => {
  let width = 135;
  let height = 145;

  if (numPlayers > 4) {
    width -= (numPlayers - 3) * 10;
    height -= (numPlayers - 3) * 10;
  } else if (numPlayers <= 4) {
    width = 120;
    height = 148;
  }

  return { width, height };
};

const AllPlayersSelectedCards: React.FC<Props> = ({ players, selectedCards }) => {
  const imageSize = calculateImageSize(players.length);
  const calculateCarCardCount = () => {
    let count = 0;
    for (let key in selectedCards) {
      if (selectedCards[key] === "car-card.png") {
        count++;
      }
    }
    return count;
  };

  return (
    <div className="h-5/6 fixed inset-0 flex flex-row justify-center items-center z-10">
      {players.map((player) => (
        <div key={player.id} className="w-full md:w-48 h-60 flex flex-col items-center bg-white">
          <div className="py-2 text-3xl font-bold text-center">
            {player.playerName}
          </div>
          <img src={selectedCards[player.id]} alt="選択したカード" width={imageSize.width} height={imageSize.height} />
          {selectedCards[player.id] === "car-card.png" && <CalculateCarMoveSpaces playerCount={players.length} carCardCount={calculateCarCardCount()} />}
        </div>
      ))}
    </div>
  );
};

export default AllPlayersSelectedCards;
