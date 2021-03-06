import React, { Component } from 'react';
import classes from  './Person.module.css'
import Aux from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'

// React.Fragment is the same as creating an Aux component

class Person extends Component 
{

  constructor(props) {
    super(props)
    this.inputElementRef = React.createRef()

  }

  static contextType = AuthContext

  componentDidMount() {
    // this.inputElement.focus()
    this.inputElementRef.current.focus()
    console.log(this.context.authenticated)
  }

  render() {
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
          {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}

          <p onClick={this.props.click}>I'm a {this.props.name} and i am {this.props.age} years old!!</p>
          <p>{this.props.children}</p>
          <input type="text" 
                 onChange={this.props.changed} 
                value={this.props.name} 
                //ref={(inputEL) => {this.inputElement = inputEL}} // older version
                ref={this.inputElementRef}
                />
        </Aux>
    )
  }
};


// checks to make sure we are getting what we expect
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func

}

export default withClass(Person, classes.Person);