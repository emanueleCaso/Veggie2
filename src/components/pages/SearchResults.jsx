import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchRecipesService } from '../../service/recipes.service';
import Card from '../../UI/Card';
import Gradient from '../../UI/Gradient';
import styled from 'styled-components';

const SearchResults = () => {
  const { searchValue } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await searchRecipesService(searchValue);
      setResults(data.results);
    };
    fetchResults();
  }, [searchValue]);

  return (
    <Grid>
      {results.map((item) => (
        <Card key={item.id}>
          <Link to={`/detail/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <Gradient />
          <p>{item.title}</p>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

export default SearchResults;