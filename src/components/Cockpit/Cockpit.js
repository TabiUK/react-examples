import React, { useEffect } from 'react';
import classes from  './Cockpit.module.css'

const cockpit = (props) => {

    useEffect(() => {
        console.log('[cockpit.js] useEffect')
        const timer = setTimeout(() => {
            alert('save data to cloud!')
        }, 1000)
        return () => {
            clearTimeout(timer)
            console.log('[cockpit.js] cleanup work in useEffect')
        }
    }, [])

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useeffect')
        return () => {
            console.log('[cockpit.js] 2nd cleanup work in useEffect')
        }
    })

    const cssClasses = [];
    let btnClass = '';

    if (props.showPersons) {
      btnClass = classes.Red;
    }

    if (props.personsLength <= 2) {
      cssClasses.push( classes.red );
    }
    if (props.personsLength <= 1) {
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

export default React.memo(cockpit);