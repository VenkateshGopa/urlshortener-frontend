import axios from 'axios';
import { useState } from 'react';
import Model from '../model/Model';
import classes from './Linkcard.module.css'
const Linkcard = (props) =>{
    const [deletesurl, setdeletesurl] = useState(false)
    const date =  new Date(props.date);
    const deleteurl = async () =>{
        await axios.get(`https://tinyurlshortner.herokuapp.com/short/delete/${props.shortid}`,{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        props.refresh();
    }
    const conform = () =>{
        setdeletesurl(true)
    }
    return(
    <>
    {deletesurl && <Model message="Are you sure do u want to delete ?" label="Delete" close={() =>{setdeletesurl(false)}} ok={deleteurl}/>}
    <div className={classes.div}>
        <div className={classes.top}>
          <div>
            <p className={classes.title}>{props.tname}</p>
            <a href={props.url} target='_blank' rel='noreferrer'>{props.url}</a>
          </div>
          <p className={classes.date}>{date.toISOString().split('T')[0]}</p>
        </div>

        <hr/>

        <div className={classes.bottom}>
          <div>
            <a href={props.surl} target='_blank' rel='noreferrer'>{props.surl}</a>
          </div>
          <div>
          <button className={classes.button}><span>{props.clicked}</span>clicks</button>
          <button className={classes.delete} onClick={conform}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
    </div>
    </>
    );
}

export default Linkcard;
