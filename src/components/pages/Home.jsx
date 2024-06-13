import React from 'react';
import MainCourse from '../MainCourse';
import Snack from '../Snack';
import Dessert from '../Dessert';
import Breakfast from '../Breakfast';
import Appetizer from '../Appetizer';
import SideDish from '../SideDish';

const Home = () => {
  return (
    <div>
      <MainCourse />
      <Breakfast />
      <SideDish />
      <Appetizer />
      <Snack />
      <Dessert />
    </div>
  );
};

export default Home;


