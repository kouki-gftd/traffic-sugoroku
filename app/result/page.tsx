'use client';

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { stationNames } from "../play-sugoroku/page";
import Link from "next/link";
import CalculateOfCo2 from "@/components/CalculateOfCo2";
import TopThree from "@/components/TopThree";

type playerData = {
  name: string;
  color: string;
  cardHistory: string[];
  stepsHistory: number[];
  totalCo2: number;
};

const Page: React.FC = () => {
  const [playerData, setPlayerData]       = useState<playerData[]>([]);
  const [rankedPlayers, setRankedPlayers] = useState<playerData[]>([]);
  const [isCo2Calculated, setIsCo2Calculated] = useState<boolean>(false);

  useEffect(() => {
    const storedPlayerData = localStorage.getItem('players');
    if (storedPlayerData) {
      const parsedPlayerData: playerData[] = JSON.parse(storedPlayerData);
      setPlayerData(parsedPlayerData);
    }
  }, []);

  useEffect(() => {
    if (isCo2Calculated) {
      // プレイヤーをcardHistoryの長さでソートして順位を計算
      const ranked = playerData.slice().sort((a, b) => {
        if (a.cardHistory.length === b.cardHistory.length) {
          return a.totalCo2 - b.totalCo2;
        }
        return a.cardHistory.length - b.cardHistory.length;
      });
      setRankedPlayers(ranked);

      console.log("RankedPlayers:", ranked);
    }
  }, [isCo2Calculated, playerData]);

  // 使用されたカードの総枚数を計算
  const totalCards = useMemo(() => {
    return playerData.reduce((total, player) => {
      return total + player.cardHistory.length;
    }, 0);
  }, [playerData]);

    // CO2排出量の合計を計算
  const totalCo2 = useMemo(() => {
    return playerData.reduce((total, player) => total + player.totalCo2, 0);
  }, [playerData]);

  // CO2排出量を集計して各プレイヤーのtotalCo2を更新するコールバック関数
  const handleCalculateCo2 = useCallback((playerName: string, co2Emission: number) => {
    console.log(`Updating CO2 for ${playerName}: ${co2Emission}`);
    setPlayerData(prevData =>
      prevData.map(player =>
        player.name === playerName ? { ...player, totalCo2: co2Emission } : player
      )
    );
  }, []);

  // 全てのプレイヤーのCo₂排出量の計算が終了したことを確認する
  const handleCo2CalculationComplete = useCallback(() => {
    setIsCo2Calculated(true);
  }, []);

  return (
    <>
      <div className="p-5 flex flex-col-reverse md:flex-row md:items-center">
        <div className="md:text-2xl font-bold text-white items-center">
          <Link href={"/room-config"} className="flex flex-row items-center my-3">
            <img src="/arrow.png" alt="矢印" className="md:mx-3 mx-1 w-6 md:w-10" />
            <div>
              Back to Room
            </div>
          </Link>
        </div>
        <div className="md:mr-20 md:pr-20 flex-1 flex text-3xl md:text-6xl font-bold justify-center">
          Game finished
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-4/5 md:my-10">
          <div className="md:my-5 flex justify-around text-blue-900 text-sm md:text-2xl font-bold">
            <div>
              Total Cards {totalCards}
            </div>
            <div>
              Total CO2 Emission XX {totalCo2}
            </div>
          </div>
          <div className="text-blue-900 font-bold text-sm md:text-xl">
            Mode Basic
          </div>
          <div className="md:w-full w-1/4 md:mx-20 flex flex-row font-bold justify-center text-white md:text-4xl text-xl">
            {stationNames.map((station, stationIndex) => (
              <div key={stationIndex} className="mx-10 m-5">
                {stationIndex + 1}
              </div>
            ))}
            <div className="m-5 flex flex-row">
              <div className="flex flex-col items-center">
                <div>Rank</div>
              </div>
              <div className="ml-5 flex flex-col">
                CO2
              </div>
            </div>
          </div>
          <div className="font-bold flex flex-row justify-start text-xl md:text-4xl text-white">
            <div className="mt-5 flex flex-col">
              {playerData.map((player, playerIndex) => (
                <div key={playerIndex} className="flex flex-row items-center mb-10">
                  <div className={`w-24 md:w-36 mb-5 py-3 font-bold text-sm md:text-2xl text-center rounded-lg ${player.color}`}>
                    {player.name}
                  </div>
                  <div className="flex flex-row ml-5">
                    {player.cardHistory.map((card, cardIndex) => (
                      card && (
                        <div key={cardIndex} className="flex flex-col items-center mx-4">
                          <img
                            src={card}
                            alt={`card ${cardIndex + 1}`}
                            width={70}
                            height={70}
                            className="mb-1"
                          />
                          <div className="text-center text-sm md:text-lg text-white">
                            +{player.stepsHistory[cardIndex]}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="mb-5 mx-3">
                    {isCo2Calculated && <TopThree player={player} allPlayers={playerData}/>}
                  </div>
                  <div>
                    <div key={playerIndex} className="flex flex-col mt-5 pb-8">
                      <CalculateOfCo2
                        name={player.name}
                        color={player.color}
                        cardHistory={player.cardHistory}
                        stepsHistory={player.stepsHistory}
                        onCalculate={handleCalculateCo2}
                        onCalculationComplete={handleCo2CalculationComplete}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;