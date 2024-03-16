import Image from "next/image";
import { IngredientsProps, Recipes } from "@/type";
import { setIngredients, setRecipes } from "@/lib/state/state";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Ingredients() {
  const state = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  const inputIngredient = (selected: IngredientsProps) => {
    const findRecipe = state.recipes.recipes.find((e: Recipes) => e.id === selected.id);
    const updateRecipes = [...state.recipes.recipes];
    let newRecipe = {
      ...selected,
      quantity: 0,
      isEdit: true
    };

    const removeIngredients = state.ingredients.filter((e: IngredientsProps) => e.id != selected.id)
    
    if (!findRecipe) {
      updateRecipes.push(newRecipe);
      dispatch(setRecipes({
        ...state.recipes,
        recipes: updateRecipes
      }))
      dispatch(setIngredients(removeIngredients));
    }
  }

  return (
    <div className="mb-20">
      <label className="font-semibold">
        List Bahan-Bahan :
      </label>
      <ul className="mt-5">
      {
          state.ingredients.map(e => (
            <li key={e.id} className="py-2 cursor-pointer capitalize" onClick={() => inputIngredient(e)}>{e.name}</li>
        ))
        }</ul>
        
    </div>
  );
}
