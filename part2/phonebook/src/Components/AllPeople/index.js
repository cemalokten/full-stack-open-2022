import React from "react";
import SinglePerson from "../SinglePerson";
const AllPeople = ({filterdPersons, handleDelete}) => {
    return <>
        <h2>Numbers</h2>
        {filterdPersons.map((c) =>  <SinglePerson key={c.name} name={c.name} number={c.number} id={c.id} handleDelete={handleDelete}/>)}
    </>
}

export default AllPeople