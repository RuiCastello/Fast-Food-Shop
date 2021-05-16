import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    // console.log('props.ingredients', props.ingredients)
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            }
        );
    }
    let ingredientsString = ingredients.map( (ig) => {
        return < span 
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
        key={ig.name} > {ig.name} ({ig.amount}) </span>;
    });


    //Another way to build the ingredients String:
    // let ingredientsString = '';
    // for (let ingredientName in props.ingredients){
    //     ingredientsString += ingredientName +'(' + props.ingredients[ingredientName] + '), ';
    // }
    // ingredientsString = ingredientsString.slice(0, (ingredientsString.length - 2));



    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsString}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;