import React from "react";

type CardSelectProps = {
  playerId: number;
  selectCard: (playerId: number, card: string) => void;
};

const CardSelect: React.FC<CardSelectProps> = ({  playerId, selectCard }) => {
  return (
  <>  
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <div className="w-2/5 h-96 rounded-lg bg-white">
        <div className="py-10 text-3xl font-bold text-center">
          Choose your card
        </div>
        <div className="flex justify-around">
          <button className="hover:opacity-60" name="car" onClick={() => selectCard(playerId, 'car-card.png')}>
            <img src="/car-card.png" alt="車カード" width={152} height={168} />
          </button>
          <button className="hover:opacity-60" name="public" onClick={() => selectCard(playerId, 'public-transport-card.png')}>
            <img src="/public-transport-card.png" alt="公共交通カード" width={152} height={168} />
          </button>
        </div>
      </div>
    </div>
  </>
  );
}

export default CardSelect;