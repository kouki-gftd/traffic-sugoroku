import React from "react";

type CalculationLogicProps = {
  selectedCards: { [id: number]: string};
};

const CalculationLogic: React.FC<CalculationLogicProps> = ({ selectedCards }) => {
  const calculateSelectedCarCards = () => {
    let count = 0;
    for (let key in selectedCards) {
      if (selectedCards[key] === "car-card.png") {
        count ++;
      }
    }
    return count;
  };

  const calculateTotalCards = () => {
    return Object.keys(selectedCards).length;
  }
  return (
    <div>
      car-card.png was selected {calculateSelectedCarCards()} times.
      Total cards selected {calculateTotalCards()} times.
    </div>
  );
};

export default CalculationLogic;