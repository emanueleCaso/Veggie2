import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Details = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=afa529ccde7c4e4ba140dd8570d5bd09`);
        const data = await response.json();
        setRecipeDetails(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }
  
  // Extract calories from the nutrition data
  const calories = recipeDetails.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories')?.amount;
  
  // Extract other nutrients if available
  const nutrients = recipeDetails.nutrition?.nutrients?.filter(nutrient => nutrient.name !== 'Calories');

  // Styled components for table
  const TableContainer = styled.div`
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  `;

  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  const TableHeader = styled.th`
    background-color: #f2f2f2;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  `;

  const TableCell = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  `;

  return (
    <div>
      <h1>{recipeDetails.title}</h1>
      <img src={recipeDetails.image} alt={recipeDetails.title} />
      <h2>Ingredients</h2>
      <ul>
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      {/* Render instructions as HTML */}
      <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
      {/* Display calories if available */}
      {calories && (
        <div>
          <h2>Nutrition</h2>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Nutrient</TableHeader>
                  <TableHeader>Amount</TableHeader>
                  <TableHeader>Unit</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>Calories</TableCell>
                  <TableCell>{calories}</TableCell>
                  <TableCell>kcal</TableCell>
                </tr>
                {/* Display other nutrients if available */}
                {nutrients.map((nutrient) => (
                  <tr key={nutrient.name}>
                    <TableCell>{nutrient.name}</TableCell>
                    <TableCell>{nutrient.amount}</TableCell>
                    <TableCell>{nutrient.unit}</TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Details;



