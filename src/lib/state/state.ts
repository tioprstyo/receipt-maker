import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientsProps, RecipesProps, Recipes } from "@/type";

type StateProps = {
  ingredients: IngredientsProps[];
  recipes: RecipesProps;
  recipeName: string;
  ordinance: string;
  recipeQty: number;
  isEditOrdinance: boolean;
  isEditRecipeName: boolean;
};

const initialState = {
  ingredients: [{
    id: 0,
    name: '',
    unit: ''
  }],
  recipes: {
    name: '',
    recipes: [],
    ordinances: []
  },
  ordinance: '',
  recipeName: '',
  recipeQty: 0,
  isEditOrdinance: false,
  isEditRecipeName: false,
} as StateProps;

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reset: () => initialState,
    setIngredients: (state, action: PayloadAction<IngredientsProps[]>) => {
      state.ingredients = action.payload
    },
    setRecipes: (state, action: PayloadAction<RecipesProps>) => {
      state.recipes = action.payload
    },
    setRecipeName: (state, action: PayloadAction<string>) => {
      state.recipeName = action.payload;
    },
    setIsEditRecipeName: (state, action: PayloadAction<boolean>) => {
      state.isEditRecipeName = action.payload;
    },
    setOrdinance: (state, action: PayloadAction<string>) => {
      state.ordinance = action.payload;
    },
    setQty: (state, action: PayloadAction<number>) => {
      state.recipeQty = action.payload;
    },
    setIsEditOrdinance: (state, action: PayloadAction<boolean>) => {
      state.isEditOrdinance = action.payload;
    },
  },
});

export const {
  setIngredients,
  setRecipes,
  setIsEditRecipeName,
  setRecipeName,
  setOrdinance,
  setIsEditOrdinance,
  setQty,
  reset,
} = menu.actions;
export default menu.reducer;