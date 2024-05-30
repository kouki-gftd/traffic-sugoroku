'use client';

import React, { useEffect, useState } from "react";
import { stationNames } from "../play-sugoroku/page";

type playerData = {
  name:         string;
  color:        string;
  cardHistory:  string[];
  stepsHistory: number[];
};

const Page: React.FC = () => {
  const [playerData, setPlayerData] = useState<playerData[]>([]);

  useEffect(() => {
    const storedPlayerData = localStorage.getItem('players');
    if (storedPlayerData) {
      setPlayerData(JSON.parse(storedPlayerData));
    }
  }, []);

  return (
    <>
      <div className="p-5 flex flex-col-reverse md:flex-row md:items-center">
        <div className="flex flex-row md:text-2xl font-bold text-white items-center">
          <img src="/arrow.png" alt="矢印" className="mx-3" />
          Back to Room
        </div>
        <div className="md:mr-20 md:pr-20 flex-1 flex text-3xl md:text-6xl font-bold justify-center">
          Game finished
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-4/5 md:my-10">
          <div className="md:my-5 flex justify-around text-blue-900 text-sm md:text-2xl font-bold">
            <div>
              Total Cards
            </div>
            <div>
              Total CO2 Emission XX
            </div>
          </div>
          <div className="text-blue-900 font-bold text-sm md:text-xl">
            Mode Basic
          </div>
          <div className="font-bold flex flex-row justify-end items-center text-xl md:text-4xl text-white">
            {stationNames.map((station, stationIndex) => (
              <div key={stationIndex} className="mx-10 ">
                {stationIndex + 1}
              </div>
            ))}
            <div className="m-5 flex flex-row">
              <div>Rank</div>
              <div className="ml-5">CO2</div>
            </div>
          </div>
          <div className="flex flex-col font-bold text-xl md:text-4xl text-white">
            {playerData.map((player, playerIndex) => (
              <div key={playerIndex} className="flex items-center">
                <div className={`flex-shrink-0 flex flex-col items-center w-15 md:w-36 py-3 mb-5 font-bold text-sm md:text-2xl text-center text-white rounded-lg ${player.color}`}>
                  {player.name}
                </div>
                <div className="flex flex-wrap flex-row justify-center ml-8">
                  {stationNames.map((station, stationIndex) => (
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
            ))}
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
