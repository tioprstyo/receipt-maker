"use client";
import { Header, Ingredients, Recipe } from "@/components";
import { setIngredients } from "@/lib/state/state";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIngredients([
      {
        name: 'apel',
        unit: 'kg',
        id: 1,
      },
      {
        name: 'garam',
        unit: 'sdm',
        id: 2
      },
      {
        name: 'tepung terigu',
        unit: 'kg',
        id: 3
      },
      {
        name: 'ayam',
        unit: 'kg',
        id: 4
      },
      {
        name: 'tepung maizena',
        unit: 'kg',
        id: 5
      },
      {
        name: 'daging sapi',
        unit: 'kg',
        id: 6
      }
    ]))
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="md:grid md:grid-cols-5 gap-4 p-10 min-h-screen divide-">
        <div className="col-span-1">
          <Ingredients />
        </div>
        <div className="col-span-4">
          <Recipe />
        </div>
      </div>
    </main>
  );
}
