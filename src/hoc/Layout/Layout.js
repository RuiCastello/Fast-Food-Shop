import { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    
    // state = {
    //     showSideDrawer: false,
    // }

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () =>{
        // this.setState({showSideDrawer: false});
        setShowSideDrawer(false);
    }
    
    const sideDrawerToggleHandler = () =>{
        // this.setState( (prevState) =>{ 
        //     return {showSideDrawer: !prevState.showSideDrawer}; 
        // });
        setShowSideDrawer(!showSideDrawer);
    }


 
    return(
        <Fragment>
        <Toolbar 
            isAuth={props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler} 
        />
        <SideDrawer 
            isAuth={props.isAuthenticated}
            open={showSideDrawer} 
            close={sideDrawerCloseHandler} 
            drawerToggleClicked={sideDrawerToggleHandler} 
        />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
    );

}

const mapStateToProps = (state) =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);