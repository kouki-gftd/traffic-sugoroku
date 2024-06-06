import React from "react";
import { stationNames } from "../app/play-sugoroku/page";

type playerDataProps = {
  name:         string;
  color:        string;
  cardHistory:  string[];
  stepsHistory: number[];
  onCalculate:  (co2Emission: number) => void;
};

const CalculateOfCo2: React.FC<playerDataProps> = ({cardHistory, onCalculate}) => {
  const carCardCount = cardHistory.filter(card => card === 'car-card.png').length;
  const totalSpaces  = stationNames.length;

  const co2Emission = 57 * carCardCount + 420 * (totalSpaces + carCardCount);

  // onCalculate callbackを使って計算結果を親コンポーネントに渡す
  React.useEffect(() => {
    onCalculate(co2Emission);
  }, [co2Emission, onCalculate]);

  return (
    <div>{co2Emission}</div>
  );
}

export default CalculateOfCo2;