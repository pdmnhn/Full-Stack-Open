import React from "react";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const Content = ({ exercises }) => {
  return (
    <>
      {exercises.map((obj, index) => {
        return <Part key={index} name={obj.name} exercise={obj.exercise} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  let total = 0;
  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises;
  }
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
