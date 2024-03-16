'use client'
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setIsEditRecipeName,
  setRecipeName,
  setRecipes,
  setOrdinance,
  setIngredients,
  setQty,
  setIsEditOrdinance
} from "@/lib/state/state";
import { Recipes, Ordinances } from "@/type";

export default function Recipe() {
  const state = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  return (
    <div className="md:px-10">
      <div className="flex gap-10">
        <input
          className={`w-full bg-transparent outline-none p-3 text-center text-xl ${state.isEditRecipeName ? 'border-b border-b-white': ''}`}
          type="text"
          placeholder="Masukkan Nama Resep"
          disabled={!state.isEditRecipeName}
          value={state.isEditRecipeName ? state.recipeName : state.recipes.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setRecipeName(e.target.value))}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              dispatch(setRecipes({
                ...state.recipes,
                name: state.recipeName
              }));
              dispatch(setIsEditRecipeName(false));
              dispatch(setRecipeName(''))
            }
          }}
          onBlur={() => {
            dispatch(setRecipes({
              ...state.recipes,
              name: state.recipeName
            }));
            dispatch(setIsEditRecipeName(false));
            dispatch(setRecipeName(''))
          }}
        />
        {
          !state.isEditRecipeName && (
            <button onClick={() => {
              dispatch(setRecipeName(state.recipes.name))
              dispatch(setIsEditRecipeName(!state.isEditRecipeName));
            }
            }>
              <Image
                src="/pencil.svg"
                alt="Edit"
                className="cursor-pointer text-white"
                width={20}
                height={24}
                priority
              />
            </button>
          )
        }
      </div>
      <div className="mt-10">
        <div>
          <label>Bahan : </label>
          <ul className="mt-5">
            {state.recipes.recipes.map((e: Recipes, i: number) => (
              <li key={e.id} className="flex mb-5">
                <span className="mr-2">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    value={e.isEdit ? state.recipeQty: e.quantity}
                    className={`w-10 outline-none text-sm ${e.isEdit ? 'bg-white text-[#000000]' : 'bg-transparent text-white'}`}
                    disabled={!e.isEdit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setQty(Number(e.target.value)))}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        let recipeByIndex = [...state.recipes.recipes];
                        let item = { ...recipeByIndex[i] };
                        item.isEdit = false;
                        item.quantity = state.recipeQty;
                        recipeByIndex[i] = item;
                        dispatch(setRecipes({
                          ...state.recipes,
                          recipes: recipeByIndex
                        }));
                        dispatch(setQty(0));
                      }
                    }}
                    onBlur={() => {
                      let recipeByIndex = [...state.recipes.recipes];
                      let item = { ...recipeByIndex[i] };
                      item.isEdit = false;
                      item.quantity = state.recipeQty;
                      recipeByIndex[i] = item;
                      dispatch(setRecipes({
                        ...state.recipes,
                        recipes: recipeByIndex
                      }));
                      dispatch(setQty(0));
                    }}
                  />
                </span>
                <span className="mr-3">{e.unit}</span>
                <span className="mr-5 capitalize">{e.name}</span>
                {
                  !e.isEdit && (
                    <span className="flex">
                      <button onClick={() => {
                        let recipeByIndex = [...state.recipes.recipes];
                        let item = { ...recipeByIndex[i] };
                        item.isEdit = true;
                        recipeByIndex[i] = item;

                        dispatch(setQty(e.quantity))
                        dispatch(setRecipes({
                          ...state.recipes,
                          recipes: recipeByIndex
                        }));
                      }}>
                        <Image
                          src="/pencil.svg"
                          alt="Edit"
                          className="cursor-pointer text-white mr-3"
                          width={20}
                          height={24}
                          priority
                        />
                      </button>
                      <button onClick={() => {
                        let ingredientList = [...state.ingredients];
                        ingredientList.push({
                          id: e.id,
                          name: e.name,
                          unit: e.unit,
                        })
                        dispatch(setIngredients(ingredientList));
                        dispatch(setRecipes({
                          ...state.recipes,
                          recipes: state.recipes.recipes.filter((rcps: Recipes) => rcps.id !== e.id)
                        }))
                      }}>
                        <Image
                          src="/delete.svg"
                          alt="Delete"
                          className="cursor-pointer text-white"
                          width={20}
                          height={24}
                          priority
                        />
                      </button>
                    </span>
                  )
                }
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Tata Cara :</label>
          <ol>
            {state.recipes.ordinances.map((e: Ordinances, idx: number) => (
              <li key={idx} className="list-decimal p-2 ml-10 capitalize">
                {
                  e.isEdit ? (
                    <input
                      type="text"
                      className="text-[#000000] py-1 px-2"
                      value={state.ordinance}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setOrdinance(e.target.value))}
                      onKeyUp={(event) => {
                        if (event.key === "Enter") {
                          let items = [...state.recipes.ordinances];
                          let item = { ...items[idx] };
                          item.isEdit = false;
                          item.label = state.ordinance;
                          items[idx] = item;

                          dispatch(setRecipes({
                            ...state.recipes,
                            ordinances: items
                          }));
                          dispatch(setOrdinance(''));
                        }
                      }}
                      onBlur={() => {
                        let items = [...state.recipes.ordinances];
                        let item = { ...items[idx] };
                        item.isEdit = false;
                        item.label = state.ordinance;
                        items[idx] = item;

                        dispatch(setRecipes({
                          ...state.recipes,
                          ordinances: items
                        }));
                        dispatch(setOrdinance(''));
                      }}
                    />
                  ) : (
                      <div className="flex">
                        <span className="mr-10">{e.label}</span>
                        <span className="flex">
                          <button
                            onClick={() => {
                              let items = [...state.recipes.ordinances];
                              let item = { ...items[idx] };
                              item.isEdit = true;
                              items[idx] = item;
                              dispatch(setRecipes({
                                ...state.recipes,
                                ordinances: items
                              }));
                              dispatch(setOrdinance(item.label))
                            }}
                          >
                            <Image
                              src="/pencil.svg"
                              alt="Edit"
                              className="cursor-pointer text-white mr-3"
                              width={15}
                              height={18}
                              priority
                            />
                          </button>
                          <button
                            onClick={() => {
                              let items = [...state.recipes.ordinances];
                              items = items.filter((selected: Ordinances) => e.label != selected.label)
                              dispatch(setRecipes({
                                ...state.recipes,
                                ordinances: items
                              }));
                            }}
                          >
                            <Image
                              src="/delete.svg"
                              alt="Delete"
                              className="cursor-pointer text-white"
                              width={15}
                              height={18}
                              priority
                            />
                          </button>
                        </span>
                      </div>
                  )
                }
              </li>
            ))}
          </ol>
          <div className="mt-20 w-full text-center">
          {
            state.isEditOrdinance ? (
              <input
                className="bg-transparent text-white p-3 mt-10 outline-none border-b border-b-white w-full"
                placeholder="Tambahkan Tatacara"
                value={state.ordinance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setOrdinance(e.target.value))}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    let existingOrdinances = [...state.recipes.ordinances];
                    existingOrdinances.push({ isEdit: false, label: state.ordinance })
                    dispatch(setRecipes({
                      ...state.recipes,
                      ordinances: existingOrdinances
                    }));
                    dispatch(setOrdinance(''));
                    dispatch(setIsEditOrdinance(false));
                  }
                }}
                onBlur={() => {
                  let existingOrdinances = [...state.recipes.ordinances];
                  existingOrdinances.push({ isEdit: false, label: state.ordinance })
                  dispatch(setRecipes({
                    ...state.recipes,
                    ordinances: existingOrdinances
                  }));
                  dispatch(setOrdinance(''));
                  dispatch(setIsEditOrdinance(false));
                }}
              />
            ) : (
                <button
                  className="mx-auto bg-[#40B7B0] rounded-lg py-2 px-6"
                  onClick={() => {
                    dispatch(setRecipeName(state.recipes.name))
                    dispatch(setIsEditOrdinance(true));
                  }}
                >
                  Tambahkan Tata Cara
                </button>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
