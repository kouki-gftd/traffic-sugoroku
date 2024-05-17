'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CardSelect from "@/components/CardSelect";
import PlayersSelectedCard from "@/components/PlayersSelectedCard";
import CalculationLogic from "@/components/CalculationLogic";
import AllPlayersSelectedCards from "@/components/AllplayersSelectedCards";
import CalculateCarMoveSpaces from "@/components/CalculateCarMoveSpaces";
import CalculatePublicMoveSpaces from "@/components/CalculatePublicMoveSpaces";

const Page = () => {
  const [showCardSelect, setShowCardSelect] = useState<boolean>(false);
  const [players, setPlayers] = useState<{ id: number, playerName: string, createdAt: Date }[]>([]);
  const [cardChoosed, setCardChoosed] = useState<boolean>(false);

  const randomCards = () => {
    const cards = ['car-card.png', 'public-transport-card.png'];
    return cards[Math.floor(Math.random() * cards.length)];
  };

  // 各プレイヤーの選択したカードを追跡するための状態変数を作成 key=数値(id) value=string
  const [selectedCards, setSelectedCards] = useState<{ [id: number]: string }>({});

  // 各プレイヤーがランダムではなく自分でカードを選択したかどうかを追跡するための状態変数を作成
  const [playerSelected, setPlayerSelected] = useState<{ [id: number]: boolean }>({});

  // 全てのプレイヤーがカードを選択したかどうかを確認
  const allPlayersSelected = Object.keys(playerSelected).length === players.length &&
    Object.values(playerSelected).every(val => val === true);

  const selectedCard = (playerId: number, card: string) => {
    setSelectedCards(prev => ({ ...prev, [playerId]: card }));
    setPlayerSelected(prev => ({ ...prev, [playerId]: true }));
    setCardChoosed(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCardSelect(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch('/api/players');
      const data = await res.json();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      players.forEach(player => {
        if (!playerSelected[player.id]) {
          selectedCard(player.id, randomCards());
        }
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [players, playerSelected]);

  const calculateCarCardCount = () => {
    let count = 0;
    for (let key in selectedCards) {
      if (selectedCards[key] === "car-card.png") {
        count++;
      }
    }
    return count;
  };

  const getPlayerBackgroundColor = (index: number) => {
    const colors =
      ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500', 'bg-stone-500', 'bg-violet-500', 'bg-cyan-500'];
    return colors[index % colors.length];
  }

  const renderPlayerCards = (players: { id: number, playerName: string, createdAt: Date }[]) => {
    return players.map((player, index) => (
      <div key={player.id} className="flex flex-col items-center text-lg">
        <div className={`w-full mb-3 text-white rounded-lg ${getPlayerBackgroundColor(index)}`}>
          {player.playerName}
        </div>
        <img className="card" src={selectedCards[player.id] || "question-card.png"} alt="カード" />
        {allPlayersSelected && selectedCards[player.id] === "car-card.png" && <CalculateCarMoveSpaces playerCount={players.length} carCardCount={calculateCarCardCount()} />}
        {allPlayersSelected && selectedCards[player.id] === "public-transport-card.png" && <CalculatePublicMoveSpaces />}
        {!allPlayersSelected && showCardSelect ? <CardSelect playerId={player.id} selectCard={selectedCard} /> : null}
        {!allPlayersSelected && cardChoosed ? <PlayersSelectedCard card={selectedCards[player.id]} /> : null}
      </div>
    ));
  }

  const renderStations = (players: { id: number, playerName: string, createdAt: Date }[]) => {
    const stationNames = [
      "Akihabara",
      "shin-Okachimati",
      "Asakusa",
      "Minami-senjyu",
      "Kita-senjyu",
      "Yashio",
      "Misato-chuo",
      "Tsukaba"
    ];

    return stationNames.map((station, index) => (
      <div key={index} className="stationLineMap">
        <img src={`/station-number${index + 1}.png`} alt={`駅番号${index + 1}`} />
        <span className="font-bold text-white">{station}</span>
        {players[index] && (
          <div className={`w-full rounded-lg text-white text-center font-bold ${getPlayerBackgroundColor(index)}`}>
            {players[index].playerName}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className="p-3 flex flex-col md:flex-row items-center">
        <Link href={"/room-config"} className="mx-3 md:mr-20 md:pr-10 text-center text-2xl md:flex md:items-center md:text-3xl md:text-start font-bold text-white">
          <img src="/arrow.png" alt="矢印" className="hideOnMobile mr-3" />Back to Room
        </Link>
        <div className="md:ml-20 md:pl-20 md:text-5xl text-end md:text-center font-bold">
          Tsukuba Express
        </div>
      </div>

      <div className="flex items-start h-screen md:h-96">
        <div className="w-full station flex flex-col-reverse md:flex-row items-start md:items-center justify-around">
          <span className="text-3xl font-bold">START</span>
          {renderStations(players)}
          <span className="text-3xl font-bold">GOAL</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-56">
        <div className="w-full md:w-4/5 md:h-full flex text-center text-sm md:text-3xl font-bold rounded-lg bg-white">
          <div className="md:mx-10 mx-2 my-3">
            STATS
          </div>
          <div className="w-full md:mx-3 my-3">
            <div className="flex justify-around">
              {renderPlayerCards(players)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;