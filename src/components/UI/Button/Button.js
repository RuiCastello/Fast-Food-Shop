import classes from './Button.module.css';

const button = (props) =>{
    
    let buttonClasses = [classes.Button, classes[props.btnType]].join(' ');
    if (props.disabled) buttonClasses += " " + classes.Disabled;
    
    return (
        <button 
        disabled={props.disabled}
        className={buttonClasses}
        onClick={props.clicked} >
            {props.children}
        </button>
    );
};


export default button;

