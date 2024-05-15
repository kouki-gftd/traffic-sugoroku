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

  const renderPlayerCards = (players: { id: number, playerName: string, createdAt: Date }[]) => {
    return players.map((player) => (
      <div key={player.id} className="flex flex-col items-center">
        {player.playerName}
        <img className="card" src={selectedCards[player.id] || "question-card.png"} alt="カード" />
        {allPlayersSelected && selectedCards[player.id] ===  "car-card.png" && <CalculateCarMoveSpaces playerCount={players.length} carCardCount={calculateCarCardCount()}/> }
        {allPlayersSelected && selectedCards[player.id] ===  "public-transport-card.png" && <CalculatePublicMoveSpaces/>}
        {!allPlayersSelected && showCardSelect ? <CardSelect playerId={player.id} selectCard={selectedCard} /> : null}
        {!allPlayersSelected && cardChoosed ? <PlayersSelectedCard card={selectedCards[player.id]} /> : null}
      </div>
    ));
  }

  return (
    <>
      <div className="p-5 flex flex-col md:flex-row items-center">
        <Link href={"/room-config"} className="mx-3 md:mr-20 md:pr-10 text-center text-2xl md:flex md:items-center md:text-3xl md:text-start font-bold text-white">
          <img src="/arrow.png" alt="矢印" className="hideOnMobile mr-3" />Back to Room
        </Link>
        <div className="md:ml-20 md:pl-20 md:text-5xl text-end md:text-center font-bold">
          Tsukuba Express
        </div>
      </div>

      <div className="flex items-start h-screen md:h-72">
        <div className="w-full station flex flex-col-reverse md:flex-row items-start md:items-center justify-around">
          <span className="text-3xl font-bold">START</span>
          <div className="stationLineMap">
            <img src="/station-number1.png" alt="駅番号1" />
            <span className="font-bold text-white">Akihabara</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number2.png" alt="駅番号2" />
            <span className="font-bold text-sm text-white">shin-<br />Okachimachi</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number3.png" alt="駅番号3" />
            <span className="font-bold text-white">Asakusa</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number4.png" alt="駅番号4" />
            <span className="font-bold text-white">Minami-senjyu</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number5.png" alt="駅番号5" />
            <span className="font-bold text-white">Kita-senjyu</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number6.png" alt="駅番号6" />
            <span className="font-bold text-white">Yashio</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number7.png" alt="駅番号7" />
            <span className="font-bold text-white">Misato-chuo</span>
          </div>
          <div className="stationLineMap">
            <img src="/station-number8.png" alt="駅番号8" />
            <span className="font-bold text-white">Tsukuba</span>
          </div>
          <span className="text-3xl font-bold">GOAL</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-center items-center h-72">
        <div className="w-full md:w-4/5 h-3/4 flex text-center text-sm md:text-3xl font-bold rounded-lg bg-white">
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