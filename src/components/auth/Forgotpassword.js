import classes from './style.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Model from '../model/Model';


const Forgotpassword = () =>{
    const [details , setdetails] = useState({});
    const [error , seteror] = useState(null);
    const [model , setmodel] = useState(false);
    const [clicked , setclicked] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(event) =>{
        const date = new Date();
        event.preventDefault();
        if(!(details.email))
        {
            seteror("fill all the details")
        }
        else
        try{
            setclicked(true);
            await axios.post('https://tinyurlshortner.herokuapp.com/auth/forgotpassword', {...details , time:date.getTime()});
            setmodel(true);
        }
        catch(err){
            setclicked(false);
            seteror(err.response.data.error);
        }

    }
    const close = ()  =>{
        navigate('/auth/login')
    }
    const changeHandler = ({target:{name, value}}) =>{
        setdetails((prev) => ({...prev , [name]:value}) )
        seteror(null);
    }
    return(
    <>
    {model && <Model message='Email with a link has been sent to your registered email address to reset your password (do check your spam folder also *)' label="Ok" close={close} ok={close}/>}
    <div className={classes.div}>
        <div className={classes.maindiv}>
            <div>
                <p className={classes.brand}>Tiny url</p>
                <p className={classes.message}>Forgot Password</p>
                <p className={classes.fpmessage}>Enter your email address below and we'll send you a link to reset your password.</p>
            </div>
            <div>
              {error && <p className={classes.error}>{error}</p>}
              <form onSubmit={submitHandler} className={classes.form}>
              <label>Email</label>
              <input type="text" name='email' onChange={changeHandler} placeholder="Email"/>
              <button disabled={clicked}>send email</button>
              </form>
            </div>
            <div>
                <p className={classes.bottom}>Don’t have a tiny url account yet? <Link to='/auth/signup'>Get started</Link></p>
                <p className={classes.bottom}> Already have an account? <Link to='/auth/login'>Click here</Link></p>
            </div>
        </div>
      </div>
      
    </>

    );
}
export default Forgotpassword;
