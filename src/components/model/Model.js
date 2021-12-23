import classes from "./Model.module.css";
const Model = (props) => {
  return (
    <>
      <div className={classes.backdrop}></div>

      <div className={classes.model}>
        <div className={classes.top}>
          <p>Tiny url</p>
          <button onClick={props.close}>x</button>
        </div>

        <div className={classes.messagediv}>
          <p>{props.message}</p>
          <div>
            <button onClick={props.ok}>{props.label}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
