'use client';

import { addPlayer } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;

    // フォームが空でないかチェック
    if (!name.trim()) {
      setError('※名前が入力されていません');
      return;
    }

    // 登録処理
    await addPlayer(name);
    router.push('/create-room');
  };

  return (
    <div>
      <h1 className="m-10 text-center text-5xl md:m-10 md:text-left md:text-4xl text-white font-bold">
        SUGOROKU
      </h1>
      <div className="w-1/3 mx-auto flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-60 h-72">
        <h1 className="mb-8 text-2xl md:mb-8 md:text-4xl font-bold">
          Register!
        </h1>
        <form  onSubmit={handleSubmit} className="w-2/3 flex flex-col">
          <p className="font-bold text-sm">
            Player Name
          </p>
          <input type="text" name="name" className="mb-5 py-1 border rounded-lg" />
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <button className="submit bg-buttonColor py-2 font-bold rounded-lg text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;