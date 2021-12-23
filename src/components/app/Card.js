import classes from './Card.module.css';
const Card = (props) =>{
    const clr = props.colour;
    return(
        <div className={`${classes.Card} ${classes[clr]} `}>
            <div className={classes.top}>
                <p>{props.name}</p>
                <p className={classes.count}>{props.count}</p>
            </div>
            <p className={classes.logo}>{props.logo}</p>
        </div>
    );
}

export default Card;