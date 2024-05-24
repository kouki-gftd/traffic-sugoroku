'use client';

import React, { useEffect, useState } from "react";
import { stationNames } from "../play-sugoroku/page";

type playerData = {
  name:  string;
  color: string;
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
        <div className="w-3/4 md:my-10">
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
          <div className="ml-10 flex font-bold text-xl md:text-4xl text-white justify-center items-center">
            {stationNames.map((station, index) => (
              <div key={index} className="m-2 md:m-8">
                {index + 1}
              </div>
            ))}
            <div>
              Rank
            </div>
            <div className="ml-5">
              CO2
            </div>
          </div>
          <div>
          <ul>
            {playerData.map((player, index) => (
              <li key={index} className={`max-w-36 mb-3 font-bold text-2xl text-center text-white rounded-lg ${player.color}`}>
                {player.name}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

    </>
  );
};

export default Page;