const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce(
    (prev, current) => prev + current.exercises,
    0
  );
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, i) => {
        return <Part key={i} part={part} />;
      })}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
