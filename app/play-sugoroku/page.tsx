'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export const stationNames = [
  "Akihabara",
  "shin-Okachimati",
  "Asakusa",
  "Minami-senjyu",
  "Kita-senjyu",
  "Yashio",
  "Misato-chuo",
  "Tsukuba"
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
  showCardSelect:  boolean;
  players:         Player[];
  cardChoosed:     boolean;
  playerPositions: {[id: number]: number };
  selectedCards:   {[id: number]: string };
  playerSelected:  {[id:number]: boolean };
  playerFinished:  Set<number>;
  cardHistory:     { [id: number]: string[] };
  stepsHistory:    { [id: number]: number[] };
};

const Page: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({
    showCardSelect: false,
    players: [],
    cardChoosed: false,
    playerPositions: {},
    selectedCards: {},
    playerSelected: {},
    playerFinished: new Set<number>(),
    cardHistory: {},
    stepsHistory: {}
  });

  const allPlayersSelected = Object.keys(state.playerSelected).length === state.players.length &&
    Object.values(state.playerSelected).every(val => val === true);

  const allPlayersFinished = state.players.length > 0 && state.players.length === state.playerFinished.size;

  const randomCards = () => CARDS[Math.floor(Math.random() * CARDS.length)];

  const selectedCard = (playerId: number, card: string) => {
    setState(prev => ({
      ...prev,
      selectedCards: { ...prev.selectedCards, [playerId]: card },
      playerSelected: { ...prev.playerSelected, [playerId]: true },
      cardChoosed: true,
      cardHistory: {
        ...prev.cardHistory,
        [playerId]: [...(prev.cardHistory[playerId] || []), card] // 選択したカードを履歴に追加
      },
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
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.players, state.playerSelected]);

  useEffect(() => {
    if (allPlayersSelected) {
      const newPositions = { ...state.playerPositions };
      const carCardCount = calculateCarCardCount();
      const stepsHistory = { ...state.stepsHistory };

      state.players.forEach(player => {
        let moveSpaces = 0;
        if (state.selectedCards[player.id] === PUBLIC_TRANSPORT_CARD) {
          moveSpaces = 2;
          newPositions[player.id] = Math.min(newPositions[player.id] + 2, stationNames.length - 1);
        } else if (state.selectedCards[player.id] === CAR_CARD) {
          moveSpaces = calculateMoveSpaces(state.players.length, carCardCount);
          console.log(moveSpaces);
          newPositions[player.id] = Math.min(newPositions[player.id] + moveSpaces, stationNames.length -1);
        }

        // プレイヤーのステップ履歴を更新
        stepsHistory[player.id] = [...(stepsHistory[player.id] || []), moveSpaces];

        // ゴールしたプレイヤーを確認
        if (newPositions[player.id] === stationNames.length - 1) {
          setState(prev => {
            const playerFinished = new Set(prev.playerFinished);
            playerFinished.add(player.id);
            return { ...prev, playerFinished };
          });
        }
      });
      setState(prev => ({ ...prev, playerPositions: newPositions, stepsHistory}));

      // すべてのカードが選択された後の3秒後に再度カードを選択
      const resetTimer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          selectedCards:  {},
          playerSelected: {},
          cardChoosed: false,
          showCardSelect: false,
          stepsHistory
        }));
        // カード選択を開始
        const showCardSelectTimer = setTimeout(() => {
          setState(prev => ({ ...prev, showCardSelect: true }));
        }, 1000);
        return () => clearTimeout(showCardSelectTimer);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [allPlayersSelected]);

  useEffect(() => {
    if (allPlayersFinished) {
      const finishTimer = setTimeout(() => {
        // プレイヤー名と背景色と選択したカード履歴、マス数履歴をローカルストレージに保存
        const playerData = state.players.map((player, index) => ({
          name:  player.playerName,
          color: PLAYER_COLORS[index % PLAYER_COLORS.length],
          cardHistory: state.cardHistory[player.id],
          stepsHistory: state.stepsHistory[player.id]
        }));
        localStorage.setItem('players', JSON.stringify(playerData));
        // 3秒後にゲーム結果ページに遷移
        router.replace('/result');
      }, 3000);
      return () => clearTimeout(finishTimer);
    }
  }, [allPlayersFinished, router]);

  const calculateCarCardCount = () => {
    return Object.values(state.selectedCards).filter(card => card === CAR_CARD).length;
  }

  const getPlayerBackgroundColor = (index: number) => PLAYER_COLORS[index % PLAYER_COLORS.length]

  const renderPlayerCards = () => {
    return state.players.map((player, index) => {
      if (state.playerFinished.has(player.id)) return null; // ゴールに到達したプレイヤーは非表示

      return (
      <div key={player.id} className="flex flex-col items-center text-lg">
        <div className={`w-full mb-3 text-white rounded-lg ${getPlayerBackgroundColor(index)}`}>
          {player.playerName}
        </div>
        <img className="card" src={state.selectedCards[player.id] || QUESTION_CARD} alt="カード" />
        {allPlayersSelected && state.selectedCards[player.id] === CAR_CARD && <CalculateCarMoveSpaces playerCount={state.players.length} carCardCount={calculateCarCardCount()} />}
        {allPlayersSelected && state.selectedCards[player.id] === PUBLIC_TRANSPORT_CARD && <CalculatePublicMoveSpaces />}
        {!allPlayersSelected && state.showCardSelect ? <CardSelect playerId={player.id} selectCard={selectedCard} /> : null}
        {!allPlayersSelected && state.cardChoosed ? <PlayersSelectedCard card={state.selectedCards[player.id]} /> : null}
      </div>
    );
  });
  };

  const renderStations = () => {
    return stationNames.map((station, index) => (
      <div key={index} className="stationLineMap">
        <img src={`/station-number${index + 1}.png`} alt={`駅番号${index + 1}`} />
        <span className="font-bold text-white">{station}</span>
        {state.players.map((player, playerIndex) => state.playerPositions[player.id] === index &&
        !state.playerFinished.has(player.id) && (
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