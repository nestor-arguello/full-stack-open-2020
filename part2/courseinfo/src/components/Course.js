import React from 'react';

import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ courses }) => {
  return courses.map(course => {
    const { name, parts } = course;

    return (
      <div key={name}>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    );
  });
};

export default Course;
