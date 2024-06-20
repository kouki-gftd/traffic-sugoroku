'use client';

import { addGameMode } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {

  const router = useRouter();
  const [gameMode, setGameMode] = useState<string>("basic"); // デフォルトのゲームモードを設定
  const [roomId, setRoomId]     = useState<string>("");      // Room IDを入力するための状態変数

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const gameModeId = await addGameMode(gameMode);
      router.push(`/room-config?gameModeId=${gameModeId}`);
    } catch (error) {
      console.error('Failed to add game mode:', error);
    }
  };

  const handleRoomIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomId) {
      router.push(`/room/${roomId}`);
    } else {
      console.error('Room ID is required');
    }
  };

  return (
    <div>
      <div className="sm:flex sm:justify-between">
        <h1 className="hideOnMobile mt-8 ml-10 text-4xl text-white font-bold">SUGOROKU</h1>
        <h1 className="hideOnMobile mt-8 mr-10 text-4xl text-white font-bold">View Result</h1>
      </div>
      <div className="w-4/5 md:w-1/2 mx-auto my-10 md:my-5 flex flex-col items-center rounded-xl bg-white bg-opacity-60">
        <div className="text-3xl my-10 md:text-5xl font-bold">
          Create New Room
        </div>
        <form onSubmit={handleRoomIdSubmit} className="flex flex-col text-center">
          Enter Room ID
          <input
           type="text"
           value={roomId}
           onChange={(e) => setRoomId(e.target.value)}
           className="border p-2 mt-2 rounded-lg"
          />
        </form>
        <p className="mt-5 mb-5 text-2xl font-bold">Choose Game Mode</p>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex">
              <input type="radio" value="basic" defaultChecked={gameMode === "basic"} />
              <div className="mx-5">
                <h1 className="text-lg font-bold">Basic</h1>
                <p>Who arrives the fastest?</p>
              </div>
            </div>
            {/* <div>
            <h1>Aging Society</h1>
            <p>Elderly people can only use trains</p>
          </div>
          <div>
            <h1>Mountain Climbing</h1>
            <p>Goal early with everyone</p>
          </div>
          <div>
            <h1>Viewing Cherry Blossoms</h1>
            <p>Two of you must quickly reserve a nice spot</p>
          </div> */}
          </div>
          <button type="submit" className="mx-5 my-5 px-20 py-3 bg-buttonColor font-bold rounded-lg text-white">
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;