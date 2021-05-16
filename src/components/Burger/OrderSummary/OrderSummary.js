import { Fragment, useEffect } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    
    //This could be a functional component, it's not just because we wanted to use componentDidUpdate() for debuggin purposes
    useEffect( () => {
        // console.log('Component did update indeed!');
    });

        const ingredientSummary = Object.keys(props.ingredients)
        .map( (igKey) =>{
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        });

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Fragment>
        );
};

export default OrderSummary;