import {Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

// Here we declare this function to be a custom hook by simply naming it "useSomething", the variable needs to start with the word "use". It's a convention, so that linting rules apply, and the hook rules are followed. 
//Hook rules are, they need to be called at the top of the component, and can't be inside any condition or function.
// what makes custom hooks special, is that custom hooks are allowed to call other hooks, while normal functions should not. Hooks should follow hooks rules.
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) =>{
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);

        // const [error, setError] = useState(null);

        // // state = {
        // //     error: null
        // // }

        // // constructor(props){
        // //     super(props);

        // //     this.reqInterceptor = axios.interceptors.request.use( (request) => {
        // //         this.setState({error: null});
        // //         return request;
        // //     });

        // //     // response.use(response, error)
        // //     this.resInterceptor = axios.interceptors.response.use( (response) => response, (error) => {
        // //         this.setState({error: error});
        // //     } );
        // // }


        // // componentWillMount = () =>{

        // // In functional components, code runs before the return function, so if we have code we need to run before the jsx, we can just write it directly before the return function. 

        //     const reqInterceptor = axios.interceptors.request.use( (request) => {
        //         setError(null);
        //         return request;
        //     });

        //     // response.use(response, error)
        //     const resInterceptor = axios.interceptors.response.use( (response) => response, (err) => {
        //         setError(err);
        //     } );
        
        // // }

        // // componentDidMount() {
        
        // // }

        // //In order to clean the leftover interceptors we should add this code: (especially since this is  higher order component which can be used to wrap multiple other components, which would create an excessive number of interceptors for each one)
        // useEffect( () =>{

        //     // a return function inside useEffect() IS A CLEAN-UP FUNCTION
        //     return () =>{
        //     //removes interceptors, which prevents memory leaks.
        //     axios.interceptors.request.eject(reqInterceptor);
        //     axios.interceptors.response.eject(resInterceptor);
        //     };
        // }, [reqInterceptor, resInterceptor]);

        // const errorConfirmedHandler = () =>{
        //     setError(null);
        // }

            return (
                <Fragment>
                    <Modal 
                    show={error}
                    modalClosed={clearError} >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Fragment>
            );
    }
};


export default withErrorHandler;