'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CardSelect from "@/components/CardSelect";
import PlayersSelectedCard from "@/components/PlayersSelectedCard";
import CalculateCarMoveSpaces from "@/components/CalculateCarMoveSpaces";
import CalculatePublicMoveSpaces from "@/components/CalculatePublicMoveSpaces";
import { calculateMoveSpaces } from "@/components/Gamerules";

const CAR_CARD = 'car-card.png';
const PUBLIC_TRANSPORT_CARD = 'public-transport-card.png';
const QUESTION_CARD = 'question-card.png';
const CARDS = [CAR_CARD, PUBLIC_TRANSPORT_CARD];

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

const PLAYER_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500',
  'bg-orange-500', 'bg-stone-500', 'bg-violet-500', 'bg-cyan-500'
];

type Player = {
  id: number;
  playerName: string;
  createdAt: Date;
};

type State = {
  showCardSelect: boolean;
  players: Player[];
  cardChoosed: boolean;
  playerPositions: {[id: number]: number };
  selectedCards:   {[id: number]:   string };
  playerSelected: {[id:number]: boolean};
}

const Page: React.FC = () => {
  const [state, setState] = useState<State>({
    showCardSelect: false,
    players: [],
    cardChoosed: false,
    playerPositions: {},
    selectedCards: {},
    playerSelected: {}
  });

  const allPlayersSelected = Object.keys(state.playerSelected).length === state.players.length &&
    Object.values(state.playerSelected).every(val => val === true);

  const randomCards = () => CARDS[Math.floor(Math.random() * CARDS.length)];

  const selectedCard = (playerId: number, card: string) => {
    setState(prev => ({
      ...prev,
      selectedCards: { ...prev.selectedCards, [playerId]: card },
      playerSelected: { ...prev.playerSelected, [playerId]: true },
      cardChoosed: true
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => setState(prev => ({ ...prev, showCardSelect: true})),1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch('/api/players');
      const data = await res.json();
      const initialPositions = data.reduce((acc: { [id: number]: number }, player: Player) => ({ ...acc, [player.id]: -1}),{}); // 初期位置は全てのプレイヤーに対して-1に設定
      setState(prev => ({ ...prev, players: data, playerPositions: initialPositions }));
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      state.players.forEach(player => {
        if (!state.playerSelected[player.id]) {
          selectedCard(player.id, randomCards());
        }
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.players, state.playerSelected]);

  useEffect(() => {
    if (allPlayersSelected) {
      const newPositions = { ...state.playerPositions };
      const carCardCount = calculateCarCardCount();

      state.players.forEach(player => {
        if (state.selectedCards[player.id] === PUBLIC_TRANSPORT_CARD) {
          newPositions[player.id] = Math.min(newPositions[player.id] + 2, stationNames.length - 1);
        } else if (state.selectedCards[player.id] === CAR_CARD) {
          const moveSpaces = calculateMoveSpaces(state.players.length, carCardCount);
          newPositions[player.id] = Math.min(newPositions[player.id] + moveSpaces, stationNames.length -1);
        }
      });
      setState(prev => ({ ...prev, playerPositions: newPositions}));
    }
  }, [allPlayersSelected]);

  const calculateCarCardCount = () => {
    return Object.values(state.selectedCards).filter(card => card === CAR_CARD).length;
  }

  const getPlayerBackgroundColor = (index: number) => PLAYER_COLORS[index % PLAYER_COLORS.length]

  const renderPlayerCards = () => {
    return state.players.map((player, index) => (
      <div key={player.id} className="flex flex-col items-center text-lg">
        <div className={`w-full mb-3 text-white rounded-lg ${getPlayerBackgroundColor(index)}`}>
          {player.playerName}
        </div>
        <img className="card" src={state.selectedCards[player.id] || QUESTION_CARD} alt="カード" />
        {allPlayersSelected && state.selectedCards[player.id] === "car-card.png" && <CalculateCarMoveSpaces playerCount={state.players.length} carCardCount={calculateCarCardCount()} />}
        {allPlayersSelected && state.selectedCards[player.id] === "public-transport-card.png" && <CalculatePublicMoveSpaces />}
        {!allPlayersSelected && state.showCardSelect ? <CardSelect playerId={player.id} selectCard={selectedCard} /> : null}
        {!allPlayersSelected && state.cardChoosed ? <PlayersSelectedCard card={state.selectedCards[player.id]} /> : null}
      </div>
    ));
  };

  const renderStations = () => {
    return stationNames.map((station, index) => (
      <div key={index} className="stationLineMap">
        <img src={`/station-number${index + 1}.png`} alt={`駅番号${index + 1}`} />
        <span className="font-bold text-white">{station}</span>
        {state.players.map((player, playerIndex) => state.playerPositions[player.id] === index && (
          <div key={player.id} className={`w-full rounded-lg text-white text-center font-bold ${getPlayerBackgroundColor(playerIndex)}`}>
            {player.playerName}
          </div>
        ))}
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
          {renderStations()}
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
              {renderPlayerCards()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;