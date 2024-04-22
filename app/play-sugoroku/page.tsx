import Link from "next/link";
import prisma from "@/lib/prisma";
import CardSelect from "@/components/CardSelect";

const Page = async () => {
  const player = await prisma.players.findMany();

  return (
    <>
      <div className="mt-5 flex flex-col">
        <Link href={"/room-config"} className="mx-3 text-center text-2xl md:flex md:items-center md:text-3xl md:text-start font-bold text-white">
          <img src="/arrow.png" alt="矢印" className="hideOnMobile mr-3" />Back to Room
        </Link>
        <div className="md:text-5xl text-end md:text-center font-bold">
          Tsukuba Express
        </div>
      </div>

      <div>
        <CardSelect/>
      </div>

      <div className="flex items-start h-screen md:h-72">
        <div className="w-full station flex flex-col-reverse md:flex-row items-center justify-around">
          <span className="text-3xl font-bold">START</span>
          <div className="flex flex-col items-center">
            <img src="/station-number1.png" alt="駅番号1" />
            <span className="font-bold text-white">Akihabara</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number2.png" alt="駅番号2" />
            <span className="font-bold text-sm text-white">shin-<br />Okachimachi</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number3.png" alt="駅番号3" />
            <span className="font-bold text-white">Asakusa</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number4.png" alt="駅番号4" />
            <span className="font-bold text-white">Minami-senjyu</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number5.png" alt="駅番号5" />
            <span className="font-bold text-white">Kita-senjyu</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number6.png" alt="駅番号6" />
            <span className="font-bold text-white">Yashio</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number7.png" alt="駅番号7" />
            <span className="font-bold text-white">Misato-chuo</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/station-number8.png" alt="駅番号8" />
            <span className="font-bold text-white">Tsukuba</span>
          </div>
          <span className="text-3xl font-bold">GOAL</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-72">
        <div className="w-full md:w-4/5 h-3/4 flex text-center text-3xl font-bold rounded-lg bg-white">
          <div className="mx-10 my-3">STATS</div>
          <div className="w-full mx-3 my-3">
            <div className="w-full flex justify-around">
              {player.map((player) => (
                <div>
                  {player.playerName}
                  <img className="card" src="/question-card.png" alt="カード" />
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