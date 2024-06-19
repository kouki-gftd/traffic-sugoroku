import React from "react";
import { stationNames } from "../app/play-sugoroku/page";

type playerDataProps = {
  name:         string;
  color:        string;
  cardHistory:  string[];
  stepsHistory: number[];
  onCalculate:  (playerName: string, co2Emission: number) => void;
  onCalculationComplete: () => void;
};

const CalculateOfCo2: React.FC<playerDataProps> = ({name, cardHistory, onCalculate, onCalculationComplete}) => {
  const carCardCount = cardHistory.filter(card => card === 'car-card.png').length;
  const totalSpaces  = stationNames.length;

  const co2Emission = React.useMemo(() => {
    return 57 * carCardCount + 420 * (totalSpaces + carCardCount);
  }, [carCardCount, totalSpaces]);

  // onCalculate callbackを使って計算結果を親コンポーネントに渡す
  React.useEffect(() => {
    onCalculate(name, co2Emission);
    onCalculationComplete(); // 計算結果の完了を通知
  }, [onCalculate, onCalculationComplete, name, co2Emission]);

  return (
    <div>{co2Emission}</div>
  );
}

export default CalculateOfCo2;
