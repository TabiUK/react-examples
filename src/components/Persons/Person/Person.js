import React from 'react';
import classes from  './Person.module.css'
import Aux from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'

// React.Fragment is the same as creating an Aux component

const person = (props) => 
{
  console.log('[person.js] rendering ...')
  /*
  *
  *  this would cause person to throw an error which can be cought by ErrorBoundary
  */
  const rnd = Math.random();
  if (rnd > 1.7) {
    throw new Error('something went wrong: ' + rnd)
  }

  return (
        <Aux> 
          <p onClick={props.click}>I'm a {props.name} and i am {props.age} years old!!</p>
          <p>{props.children}</p>
          <input type="text" onChange={props.changed} value={props.name}/>
        </Aux>
    )
};


// checks to make sure we are getting what we expect
person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func

}

export default withClass(person, classes.Person);