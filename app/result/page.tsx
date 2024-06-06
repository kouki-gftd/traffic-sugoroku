'use client';

import React, { useCallback, useEffect, useState } from "react";
import { stationNames } from "../play-sugoroku/page";
import Link from "next/link";
import CalculateOfCo2 from "@/components/CalculateOfCo2";

type playerData = {
  name: string;
  color: string;
  cardHistory: string[];
  stepsHistory: number[];
};

const Page: React.FC = () => {
  const [playerData, setPlayerData] = useState<playerData[]>([]);
  const [totalCo2, setTotalCo2] = useState<number>(0);

  useEffect(() => {
    const storedPlayerData = localStorage.getItem('players');
    if (storedPlayerData) {
      setPlayerData(JSON.parse(storedPlayerData));
    }
  }, []);

  // 使用されたカードの総枚数を計算
  const totalCards = () => {
    return playerData.reduce((total, player) => {
      return total + player.cardHistory.length;
    }, 0);
  };

  // CO2排出量を集計するコールバック関数
  const handleCalculateCo2 = useCallback((co2Emission: number) => {
    setTotalCo2(prevTotal => prevTotal + co2Emission);
  }, []);

  return (
    <>
      <div className="p-5 flex flex-col-reverse md:flex-row md:items-center">
        <div className="md:text-2xl font-bold text-white items-center">
          <Link href={"/room-config"} className="flex flex-row items-center">
            <img src="/arrow.png" alt="矢印" className="mx-3" />
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
              Total Cards {totalCards()}
            </div>
            <div>
              Total CO2 Emission XX {totalCo2}
            </div>
          </div>
          <div className="text-blue-900 font-bold text-sm md:text-xl">
            Mode Basic
          </div>
          <div className="font-bold flex flex-row justify-end text-xl md:text-4xl text-white">
            <div className="mt-20 pt-3">
              {playerData.map((player, playerIndex) => (
                <div
                  key={playerIndex}
                  className={`w-15 md:w-36 py-3 mb-14 font-bold text-sm md:text-2xl text-center rounded-lg ${player.color}`}
                >
                  {player.name}
                </div>
              ))}
            </div>
            {stationNames.map((station, stationIndex) => (
              <div>
                <div key={stationIndex} className="mx-10 m-5">
                  {stationIndex + 1}
                </div>
                <div>
                  <div>
                    {playerData.map((player, playerIndex) => (
                      player.cardHistory[stationIndex] && (
                        <div key={stationIndex} className="flex flex-col items-center mx-4">
                          <img
                            src={player.cardHistory[stationIndex]}
                            alt={`card ${stationIndex + 1}`}
                            width={70}
                            height={70}
                            className="mb-1"
                          />
                          <div className="text-center text-sm text-white">
                            +{player.stepsHistory[stationIndex]}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="m-5 flex flex-row">
              <div className="flex flex-col items-center">
                <div>
                  Rank
                </div>
              </div>
              <div className="ml-5 flex flex-col">
                CO2
                <div>
                  {playerData.map((player, playerIndex) => (
                    <div key={playerIndex} className="flex flex-col mt-10 pb-8">
                      <CalculateOfCo2
                        name={player.name}
                        color={player.color}
                        cardHistory={player.cardHistory}
                        stepsHistory={player.stepsHistory}
                        onCalculate={handleCalculateCo2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
