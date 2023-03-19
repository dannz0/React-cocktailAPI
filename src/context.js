import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(
    async function () {
      setLoading(true);

      try {
        const res = await fetch(`${url}${searchKey}`);
        const data = await res.json();

        const { drinks } = data;

        if (drinks) {
          const newCocktails = drinks.map((cocktail) => {
            const {
              idDrink: id,
              strDrink: name,
              strDrinkThumb: img,
              strAlcoholic: isAlcoholic,
              strGlass: glass,
            } = cocktail;

            return { id, name, img, isAlcoholic, glass };
          });
          setCocktails(newCocktails);
        }

        if (!drinks) setCocktails([]);
      } catch (error) {
        console.error(error.response);
      }
      setLoading(false);
    },
    [searchKey]
  );

  useEffect(() => {
    fetchDrinks();
  }, [searchKey, fetchDrinks]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchKey }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
