import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>

        {/* Em vez de usar Links normais "<a href" devemos usar <Link> ou <NavLink> quando usamos o router */}
        {/* <a 
        href={props.link}
        className={props.active ? classes.active : null} > {props.children}</a> */}

        {/* USANDO <NavLink> */}
        <NavLink
        exact={props.exact}
        activeClassName={classes.active}
        to={props.link} > {props.children}</NavLink>
    </li>
);

export default navigationItem;

