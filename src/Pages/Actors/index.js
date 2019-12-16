import React, { useState, useEffect } from "react";
import ActorsList from "./ActorList/";
import getActors from "../../api/actors/getActors";

const Actors = () => {
  const [actorsNames, setActorsNames] = useState();
  const [value, setValue] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const fetchActors = async () => {
      try {
        const actors = await getActors("people", {
          mehod: "GET",
          signal: abortController.signal
        });

        setActorsNames(actors.results.map(actor => actor.name));
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.log(error.message);
        }
      }
    };

    fetchActors();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleDelete = name => () => {
    setActorsNames(actorsNames.filter(actorName => actorName !== name));
  };

  const handleAdd = event => {
    if (value) {
      setActorsNames(actorsNames.concat(value));
    }
    setValue("");
    event.preventDefault();
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <>
      <h1>Actors List</h1>
      {actorsNames ? (
        <>
          <ActorsList actorsNames={actorsNames} handleDelete={handleDelete} />
          <form onSubmit={handleAdd}>
            <input type="text" value={value} onChange={handleChange} />
            <button type="submit">Add actor</button>
          </form>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Actors;
