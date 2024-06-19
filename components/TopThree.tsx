import React from "react";

type Player = {
  name: string;
  color: string;
  cardHistory: string[];
  stepsHistory: number[];
  totalCo2: number;
};

type TopThreeProps = {
  player: Player;
  allPlayers: Player[];
};

const TopThree: React.FC<TopThreeProps> = ({ player, allPlayers }) => {
  // cardHistoryの長さが短い順に並べ、同じ長さの場合はtotalCo2の値が低い方を優先
  const sortedPlayers = [...allPlayers].sort((a, b) => {
    if (a.cardHistory.length === b.cardHistory.length) {
      return a.totalCo2 - b.totalCo2;
    }
    return a.cardHistory.length - b.cardHistory.length;
  });

  const playerRank = sortedPlayers.findIndex(p => p.name === player.name) + 1;

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

  const rankImage = getRankImage(playerRank);

  return (
    <div className="flex flex-col items-center">
      {rankImage && <img src={rankImage} alt={`${playerRank} place`} width={80} height={80}/>}
    </div>
  )
}

export default TopThree;