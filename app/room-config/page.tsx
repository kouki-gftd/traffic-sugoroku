'use client';
import React, { useState, useEffect } from 'react';
import { getCityId, getGameMode, getPlayers } from "@/lib/actions";
import { useRouter, useSearchParams } from 'next/navigation';
import { handleNextClick } from '@/lib/actions';

type Player = {
  id: number;
  playerName: string;
  createdAt: Date;
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const [players, setPlayers] = useState<{id: number, playerName: string, createdAt: Date}[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const cities = ['Tokyo', 'Hongkong', 'Jakarta', 'Delhi', 'Bangkok'];
  const [cityIndex, setCityIndex] = useState(0);

  const traffic = ['normal', ' unhandiness'];
  const [trafficIndex, setTrafficIndex] = useState(0);

  // async/await を使用したコード
  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     const playersData = await getPlayers();
  //     setPlayers(playersData);
  //   }
  //   fetchPlayers();
  // }, []);

  // Promise チェーン を使用したコード
  useEffect(() => {
    getPlayers().then(setPlayers)
    .catch(error => console.error('Failed to fetch players:', error));
  },[]);

  const handleCityPrevClick = () => {
    setCityIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cities.length - 1));
  };

  const handleCityNextClick = () => {
    setCityIndex((prevIndex) => (prevIndex < cities.length - 1 ? prevIndex + 1 : 0));
  };

  const handleTrafficPrevClick = () => {
    setTrafficIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : traffic.length - 1));
  }

  const handleTrafficNextClick = () => {
    setTrafficIndex((prevIndex) => (prevIndex < traffic.length - 1 ? prevIndex + 1 : 0));
  }

  const nextButton = async () => {
    const cityName = cities[cityIndex];
    const gameModeId = Number(searchParams.get("gameModeId"));
    const publicTransport = traffic[trafficIndex];
    await handleNextClick(cityName, gameModeId, publicTransport);
    router.push("/play-sugoroku");
  };

  return (
    <div>
      <div className="sm:flex sm:justify-between">
        <h1 className="hideOnMobile mt-8 ml-10 text-4xl text-white font-bold">SUGOROKU</h1>
        <h1 className="hideOnMobile mt-8 mr-10 text-4xl text-white font-bold">View Result</h1>
      </div>
      <div className="w-4/5 md:w-1/2 mx-auto flex flex-col items-center rounded-xl bg-white bg-opacity-60">
        <div className="m-5 md:my-10 text-5xl font-bold">
          Room
        </div>
        <div className="w-3/4 text-1xl md:text-2xl text-center font-bold">
          <div className="mb-3 md:mb-10">
            Game Mode
          </div>
          <div className="md:mb-10 md:flex justify-between items-center">
            City
            <div className="md:w-1/2 mb-3 py-3 bg-white rounded-3xl flex justify-between">
              <button onClick={handleCityPrevClick}><img src="/left.png" alt="left-cursor" /></button>
              <span className="text-blue-800">{cities[cityIndex]}</span>
              <button onClick={handleCityNextClick}><img src="/right.png" alt="right-cursor" /></button>
            </div>
          </div>
          <div className="md:mb-10 md:flex justify-between items-center">
            Public transport
            <div className="md:w-1/2 mb-3 py-3 bg-white rounded-3xl flex justify-between">
              <button onClick={handleTrafficPrevClick}><img src="/left.png" alt="left-cursor" /></button>
              <span className="text-blue-800">{traffic[trafficIndex]}</span>
              <button onClick={handleTrafficNextClick}><img src="/right.png" alt="right-cursor" /></button>
            </div>
          </div>
        </div>
        <div>
          <div className="m-3 text-3xl md:text-4xl text-center font-bold">
            Current Players
            <ul>
              {players.map(player => (
                <li key={player.id} className="my-5 text-sm md:text-2xl flex justify-between">
                  <span>
                    Player {player.id}
                  </span>
                  <span>
                    {player.playerName}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={nextButton} className="m-3 text-2xl bg-buttonColor p-3 font-bold rounded-lg text-white">
          START GAME!
        </button>
      </div>
    </div>
  );
}

export default Page;