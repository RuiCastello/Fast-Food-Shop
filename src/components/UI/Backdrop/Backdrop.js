import classes from './Backdrop.module.css';


//props.show = true enables the backdrop
//props.clicked = handler function activated with onClick listener

const backdrop = (props) =>(

    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null

);


export default backdrop;