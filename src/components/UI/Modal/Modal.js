import classes from './Modal.module.css';
import React, { Fragment, useEffect } from 'react';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    useEffect( () => {
        // console.log('Modal updated!');
    });

    //
    //  !! shouldComponentUpdate ====>>> React.memo() !!
    //  Instead of shouldComponentUpdate we can use React.memo() and pass a second argument with a function that uses the inverted logic of shouldComponentUpdate.
    //
    
    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return ( (nextProps.show !== props.show) || (nextProps.children !== props.children) );
    // };

        return(
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
                }} >
                {props.children}
            </div>
        </Fragment>
        );
};

export default React.memo(Modal, (prevProps, nextProps) =>{
   return (nextProps.show === prevProps.show) && (nextProps.children === prevProps.children)
});