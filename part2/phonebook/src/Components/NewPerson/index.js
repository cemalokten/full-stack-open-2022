import React from "react";

const NewPerson = ({newPerson, handleNewName, handleNewNumber, handleSubmit}) => {
    return (
        <>
            <h3>add a new</h3>
            <div>
                name: <input value={newPerson.name} onChange={handleNewName}/>
            </div>
            <div>
                number: <input value={newPerson.number} onChange={handleNewNumber}/>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </>
)
}

export default NewPerson
