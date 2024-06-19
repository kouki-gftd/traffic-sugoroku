import React from "react";

type PlayerProps = {
  player: {
    name: string;
    color: string;
    cardHistory: string[];
    stepsHistory: number[];
    totalCo2: number;
  };
  rank: number;
};

const PlayerWithRank: React.FC<PlayerProps> = ({player, rank}) => {

  const getRankImage = (rank: number) => {
    switch (rank) {
      case 0:
        return "/1st-place.png";
      case 1:
        return "/2nd-place.png";
      case 2:
        return "/3rd-place.png";
      default:
        return null;
    }
  };

  const rankImage = getRankImage(rank);

  return (
    <div className="flex flex-col items-center">
      {rankImage && <img src={rankImage} alt="Rank" width={80} height={80}/>}
    </div>
  );
};

export default PlayerWithRank;