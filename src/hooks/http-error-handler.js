import { useState, useEffect } from 'react';

// Custom hook that acts like a middleware for axios with its interceptors
const useHttpErrorHandler = (httpClient) => {
    const [error, setError] = useState(null);

        const reqInterceptor = httpClient.interceptors.request.use( (request) => {
            setError(null);
            return request;
        });

        // response.use(response, error)
        const resInterceptor = httpClient.interceptors.response.use( (response) => response, (err) => {
            setError(err);
        } );


    //In order to clean the leftover interceptors we should add this code: (especially since this is  higher order component which can be used to wrap multiple other components, which would create an excessive number of interceptors for each one)
    useEffect( () =>{

        // a return function inside useEffect() IS A CLEAN-UP FUNCTION
        return () =>{
        //removes interceptors, which prevents memory leaks.
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () =>{
        setError(null);
    }

    return [error, errorConfirmedHandler];
}

export default useHttpErrorHandler;