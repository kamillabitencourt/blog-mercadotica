import { createContext, ReactNode, useState } from "react";

interface CategoryContextProps {
  categorySelected: number,
  changeCategory: (index: number) => void
}

interface CategoryProviderProps {
  children: ReactNode
}

export const CategoryContext = createContext({} as CategoryContextProps)

export function CategoryProvider({children} : CategoryProviderProps) {

  const [categorySelected, setCategorySelected] = useState(0);

  function changeCategory(index: number) {
    setCategorySelected(index)
  }

  return (
    <CategoryContext.Provider value={{categorySelected, changeCategory}}>
      {children}
    </CategoryContext.Provider>
  )
}