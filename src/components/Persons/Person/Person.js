import React from 'react';
import classes from  './Person.module.css'

const person = (props) =>
{
  /*
  *
  *  this would cause person to throw an error which can be cought by ErrorBoundary
  */
  const rnd = Math.random();
  if (rnd > 1.7) {
    throw new Error('something went wrong: ' + rnd)
  }

  return (

        <div className={classes.Person}> 
          <p onClick={props.click}>I'm a {props.name} and i am {props.age} years old!!</p>
          <p>{props.children}</p>
          <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;