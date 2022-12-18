import React from "react";

const Course = ({courses}) => {

    const Heading = ({name}) => {
        return (<h2>{name}</h2>)
    }

    const Part = ({part, exercise}) => {
        return <p>{part} {exercise}</p>
    }

    const Content = ({content})=> {
        return content.map(({name, exercises}) => {
            return <Part part={name} exercise={exercises}/>
        })
    }

    const Total = ({parts}) => {
        return (<p><b>total of {parts.reduce((acc, c) => acc + c.exercises, 0)} exercises</b></p>)
    }

    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map((course) => {
                return (
                    <div>
                        <Heading name={course.name}/>
                        <Content content={course.parts}/>
                        <Total parts={course.parts}/>
                    </div>
                )
            })}
        </>
    )
}

export default Course