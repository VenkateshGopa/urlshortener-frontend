import classes from './Header.module.css';
const  Header = () =>{
    return(
        <div className={classes.header}>
            <div className={classes.brand}>
                <p>Tiny url</p>
            </div>
            {/* <div className={classes.buttons}>
                <p>|||</p>
            </div> */}
        </div>
    )
}

export default Header;