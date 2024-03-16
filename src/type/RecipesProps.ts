export type Recipes = {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  isEdit: boolean;
};

export type Ordinances = {
  isEdit: boolean;
  label: string;
}

export type RecipesProps = {
  name: string;
  recipes: Recipes[];
  ordinances: Ordinances[];
}