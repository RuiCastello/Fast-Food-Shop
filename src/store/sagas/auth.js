import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';

// import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

//function* is not a function, it's a generator.
export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    //Podemos usar aqui diretamente um objecto que é aceite pelo dispatch to redux, ou podemos usar um action creator
    // yield put(
    //     { type: actionTypes.AUTH_LOGOUT }
    // );

    yield put(actions.logoutSucceed());
}


export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}


export function* authUserSaga(action) {
    // Authenticate the user
    yield put(actions.authStart());
 
    //
    // USING FIREBASE AUTH API
    //
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    }

    //If user is trying to log-in or sign-up(register) we switch the POST url
    // sign-up url
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

    // if user is trying to log-in instead of sign-up:
    if (!action.isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_WEB_API_KEY; 


    try{
        const response = yield axios.post(url, authData);
        
        // console.log('response firebase: ', response);

        // LOCAL STORAGE
        const expirationDate = yield new Date( new Date().getTime() + response.data.expiresIn * 1000 );
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);

        yield put( actions.authSuccess(response.data) );
        yield put( actions.checkAuthTimeout(response.data.expiresIn) );
        yield put( actions.minusOneSecond());
        
    }
    catch(error) {
        //Errors in Axios come through the object "response", "request", or just "error", depending on where the error happened
        if (error.response){
            yield put( actions.authFail( {message: error.response.data.error.message} ) );
        }
        else if (error.request){
            yield put( actions.authFail( {message: "There's and error with this request"} ) );
        }
        else{
            yield put( actions.authFail( {message: "There's a general error with this axios code"} ) );
        }
    }

}


export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if (!token){
        yield put(actions.logout())
    }
    else{
        //When we retrieve the expirationDate from localStorage it will be a string, so we need to convert it again to a Date object
        const expirationDate = yield new Date( localStorage.getItem('expirationDate') );
        
        if ( expirationDate > new Date() ){
            const userId = yield localStorage.getItem('userId');
            yield put( actions.authSuccess( {idToken: token, localId: userId} ) );

            const miliSecondsToExpire = yield expirationDate.getTime();
            const rightNowInMiliSeconds = yield new Date().getTime();

            const secondsToExpire = yield (miliSecondsToExpire - rightNowInMiliSeconds) / 1000

            // console.log (secondsToExpire);
            yield put( actions.checkAuthTimeout( secondsToExpire ) )
        }else{
            yield put(actions.logout());
        }

        
    }
    

}