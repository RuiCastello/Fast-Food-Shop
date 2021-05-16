import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
 if (props.icon){
     return(  
     <div className={classes.Icon}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>);

 }
 else return(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
 );
};


export default logo;