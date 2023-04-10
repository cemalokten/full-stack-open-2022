import React from "react";
import SinglePerson from "../SinglePerson";
const AllPeople = ({ filterdPersons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {filterdPersons.map((c) => (
        <SinglePerson
          key={c?.name ? c.name : 'No name'}
          name={c?.name ? c.name : 'No name'}
          number={c.number}
          id={c._id}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default AllPeople