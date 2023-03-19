import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();
        const { drinks } = data;
        console.log(drinks);

        if (drinks) {
          const {
            strDrink: name,
            strDrinkThumb: img,
            strAlcoholic: isAlcoholic,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1: ing1,
            strIngredient2: ing2,
            strIngredient3: ing3,
            strIngredient4: ing4,
            strIngredient5: ing5,
          } = drinks[0];
          const ingredients = [ing1, ing2, ing3, ing4, ing5];

          const newCocktail = {
            name,
            img,
            isAlcoholic,
            category,
            glass,
            instructions,
            ingredients,
          };

          setCocktail(newCocktail);
        }
        if (!drinks) {
          setCocktail(null);
        }
      } catch (error) {
        console.error(error.response);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>;
  }

  const { name, img, category, isAlcoholic, glass, instructions, ingredients } =
    cocktail;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>

      <div className='drink'>
        <img src={img} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>

          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>

          <p>
            <span className='drink-data'>info :</span>
            {isAlcoholic}
          </p>

          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>

          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>

          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((item, i) => {
              return item ? <span key={i}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
