import React from 'react';
import classes from  './Cockpit.module.css'

const cockpit = (props) => {
    
    const cssClasses = [];
    let btnClass = '';

    if (props.showPersons) {
      btnClass = classes.Red;
    }

    if (props.persons.length <= 2) {
      cssClasses.push( classes.red );
    }
    if (props.persons.length <= 1) {
      cssClasses.push( classes.bold )
    }

    return (
        <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={cssClasses.join(' ')} >This is really working!</p>
        <button className={btnClass} onClick={props.clicked}>toggle person</button>
        </div>
    )
}

export default cockpit;