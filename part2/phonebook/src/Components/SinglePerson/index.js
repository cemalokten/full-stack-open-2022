import React from "react";

const SinglePerson = ({id, name, number, handleDelete}) => {
   return (
    <p>{name} {number}  <button onClick={(e) => handleDelete(e, id)}>delete</button></p>
)
}
export default SinglePerson