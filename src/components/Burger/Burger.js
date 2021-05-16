import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{

    // let transformedIngredients = Object.keys(props.ingredients)
    // .map( (igKey) =>{
    //     return [...Array(props.ingredients[igKey])].map( (_, i) => {
    //         return <BurgerIngredient key={igKey + i} type={igKey} />;
    //     }) 
    // })
    // .reduce( (arr, el) => {
    //     return arr.concat(el);
    //     // return [...arr, ...el];
    // }, []);
    
    // let transformedIngredients = Object.keys(props.ingredients)
    // .map( (igKey) =>{
    //     return Array(props.ingredients[igKey]).fill(undefined)
    //     .map( (_, i) => {
    //         return <BurgerIngredient key={igKey + i} type={igKey} />; }) 
    // })
    // .reduce( (arr, el) => {
    //     return arr.concat(el);
    //     // return [...arr, ...el];
    // }, []);


    let transformedIngredients = [];
    Object.entries(props.ingredients).forEach( ([ingredientType, ingredientQuantity], index) =>{
        for (let i = 0; i < ingredientQuantity; i++){
            let jsx = <BurgerIngredient key={ingredientType + i} type={ingredientType} />
            transformedIngredients.push(jsx);
        }        
    });

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    // console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;