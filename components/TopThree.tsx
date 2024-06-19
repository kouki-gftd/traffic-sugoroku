import React from "react";

type Player = {
  name: string;
  color: string;
  cardHistory: string[];
  stepsHistory: number[];
  totalCo2: number;
};

type TopThreeProps = {
  players: Player[];
};

const TopThree: React.FC<TopThreeProps> = ({ players }) => {
  // cardHistoryの長さが短い順に並べ、同じ長さの場合はtotalCo2の値が低い方を優先
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.cardHistory.length === b.cardHistory.length) {
      return a.totalCo2 - b.totalCo2;
    }
    return a.cardHistory.length - b.cardHistory.length;
  });

  // 上位3位までのプレイヤーを抽出
  const topThreePlayers = sortedPlayers.slice(0, 3);
  console.log("Top Three Players:", topThreePlayers);

  // ランク画像を取得する関数
  const getRankImage = (rank: number): string | undefined => {
    switch (rank) {
      case 1:
        return "/1st-place.png";
      case 2:
        return "/2nd-place.png";
      case 3:
        return "/3rd-place.png";
      default:
        return undefined;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {topThreePlayers.map((player, index) => (
        <div key={player.name}>
          <img src={getRankImage(index + 1)} alt={`${index + 1} place`} width={80} height={80} />
        </div>
      ))}
    </div>
  )
}

export default TopThree;