import React from "react";

const cardNames: Record<string, string> = {
  'car-card.png': 'Car',
  'public-transport-card.png': 'Public Transport',
};

type ChosenCardProps = {
  card: string;
};

const ChosenCard: React.FC<ChosenCardProps> = ({ card }) => {
  const cardName = cardNames[card] || 'unknown';
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-10">
        <div className="w-2/5 flex flex-col items-center h-96 rounded-lg bg-white">
          <div className="py-10 text-3xl font-bold text-center">
            You chose a `{cardName}`
          </div>
          <img src={card} alt="選択したカード" width={152} height={168} />
        </div>
      </div>
    </>
  );
}

export default ChosenCard;