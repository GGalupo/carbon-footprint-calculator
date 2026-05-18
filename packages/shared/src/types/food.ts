export type FoodResult = {
  total: number;
  breakdown: {
    redMeat: number;
    whiteMeat: number;
    dairy: number;
    cereals: number;
    vegetables: number;
    fruit: number;
    oils: number;
    snacks: number;
    drinks: number;
  };
};
