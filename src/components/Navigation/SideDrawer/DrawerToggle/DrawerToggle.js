import classes from './DrawerToggle.module.css';


const drawerToggle = (props) => {

    let theClass = classes.DrawerToggle;

    if (props.altStyle) theClass = classes.DrawerToggleAlt;

    return(
        <div className={theClass} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default drawerToggle;