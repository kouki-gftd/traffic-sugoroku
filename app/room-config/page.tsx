import React from "react";
import prisma from "@/lib/prisma";

const Page = async () => {
  const Players = await prisma.players.findMany();

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
        <div className="text-1xl md:text-2xl text-center font-bold">
          <div className="md:mb-10">
            Game Mode
          </div>
          <div className="md:mb-10">
            City
          </div>
          <div className="md:mb-10">
            Public transport
          </div>
        </div>
        <div>
          <div className="m-3 text-3xl md:text-4xl text-center font-bold">
            Current Players
            <ul>
              {Players.map(player => (
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
        <button className="m-3 text-2xl bg-buttonColor p-3 font-bold rounded-lg text-white">
          START GAME!
        </button>
      </div>
    </div>
  );
}

export default Page;