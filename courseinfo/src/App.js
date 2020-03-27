import React from 'react';
import Course from './components/Course'

const Title = ({text}) => <h1>{text}</h1>

const App = ({ courses }) => {
  return (
    <div>
      <Title text="Web development curriculum" />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App;
