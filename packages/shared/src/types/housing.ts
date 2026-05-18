export type HousingResult = {
  total: number;
  breakdown: {
    electricity: number;
    naturalGas: number;
    heatingOil: number;
    lpg: number;
    waste: number;
    water: number;
  };
};
