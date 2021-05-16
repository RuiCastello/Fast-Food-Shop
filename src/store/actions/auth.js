// import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = (authData) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () =>{
    //Aqui não fazemos mais isto porque vamos usar redux-saga
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');

    // Tudo o que não for o return de uma ação, passa a ser feito no redux-saga
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


//Automatically logs the user out once the expiration time of the tokenId received from firebase is reached (it's 3600 seconds by default = 1 hour)
export const checkAuthTimeout = (expirationTime) =>{

    // WITHOUT SAGAS
    // return (dispatch) =>{
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // }

    //WITH SAGAS
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }

}


//Countdown each second until "state.timer" reaches 0 in the "auth" reducer
export const minusOneSecond = () =>{
    return (dispatch, getState) =>{
        setTimeout(() => {
            if(getState().auth.timer > 0) {
                dispatch({type: 'MinusOneSecond'});
                dispatch(minusOneSecond());
                // console.log(getState().auth.timer);
            }
        }, 1000);
    }
}

//
// WITHOUT SAGAS
//
// export const auth = (email, password, isSignup) =>{
//     return (dispatch) =>{
//         // Authenticate the user
//         dispatch(authStart());

//         //
//         // USING FIREBASE AUTH API
//         //
//         const authData = {
//             email: email,
//             password: password,
//             returnSecureToken: true,
//         }


//         //If user is trying to log-in or sign-up(register) we switch the POST url
        
//         // sign-up url
//         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

//         // if user is trying to log-in instead of sign-up:
//         if (!isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_WEB_API_KEY; 

//         axios.post(url, authData)
//             .then( (response) =>{
//                 console.log('response firebase: ', response);

//                 // LOCAL STORAGE
//                 const expirationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
//                 localStorage.setItem('token', response.data.idToken);
//                 localStorage.setItem('expirationDate', expirationDate);
//                 localStorage.setItem('userId', response.data.localId);

//                 dispatch( authSuccess(response.data) );
//                 dispatch(checkAuthTimeout(response.data.expiresIn));
//                 dispatch(minusOneSecond());
//             })
//             .catch( (error) =>{
//                 //Errors in Axios come through the object "response", "request", or just "error", depending on where the error happened
//                 if (error.response){
//                     dispatch( authFail( {message: error.response.data.error.message} ) );
//                 }
//                 else if (error.request){
//                     dispatch( authFail( {message: "There's and error with this request"} ) );
//                 }
//                 else{
//                     dispatch( authFail( {message: "There's a general error with this axios code"} ) );
//                 }
//             })

//     };
// };


//
// WITH SAGAS
//
export const auth = (email, password, isSignup) =>{
    return{
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
}


export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}



export const authCheckState = ()  =>{
    
    //
    //  WITHOUT SAGAS
    //
    // return (dispatch) =>{
    //     const token = localStorage.getItem('token');
    //     if (!token){
    //         dispatch(logout())
    //     }
    //     else{
    //         //When we retrieve the expirationDate from localStorage it will be a string, so we need to convert it again to a Date object
    //         const expirationDate = new Date( localStorage.getItem('expirationDate') );
            
    //         if ( expirationDate > new Date() ){
    //             const userId = localStorage.getItem('userId');
    //             dispatch( authSuccess( {idToken: token, localId: userId} ) );

    //             const miliSecondsToExpire = expirationDate.getTime();
    //             const rightNowInMiliSeconds = new Date().getTime();

    //             const secondsToExpire = (miliSecondsToExpire - rightNowInMiliSeconds) / 1000

    //             console.log (secondsToExpire)
    //             dispatch( checkAuthTimeout( secondsToExpire ) )
    //         }else{
    //             dispatch(logout());
    //         }

           
    //     }
    // }

    //
    // WITH SAGAS
    //
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }

}