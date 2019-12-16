import React from "react";

const Actors = props => {
  const { actorsNames, handleDelete } = props;

  return (
    <ul>
      {actorsNames.map(name => {
        return (
          <li key={name}>
            {name}
            <button onClick={handleDelete(name)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Actors;
