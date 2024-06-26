import React, { useEffect, useState } from 'react';
import { getMainCourseService } from '../service/recipes.service';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../UI/Card';
import Gradient from '../UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';

const MainCourse = () => {
  const [mainCourse, setMainCourse] = useState([]);

  useEffect(() => {
    const fetchMainCourse = async () => {
      const localData = getLocalStorageData('mainCourse');
      if (localData) {
        setMainCourse(localData);
      } else {
        const data = await getMainCourseService();
        if (data && data.results) {
          setMainCourse(data.results);
          setLocalStorageData('mainCourse', data.results, 60); // Impost0 60 minuti di scadenza
        }
      }
    };

    fetchMainCourse();
  }, []);

  return (
    <Wrapper>
      <h3>Main Course</h3>
      <Splide
        aria-label="Main Course"
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {mainCourse.map((item) => (
          <SplideSlide key={item.id}>
            <Card>
              <Link to={`/detail/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <Gradient />
              <p>{item.title}</p>
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
  text-align: center;

  h3 {
    font-size: 1.8rem;
  }
`;

export default MainCourse;

