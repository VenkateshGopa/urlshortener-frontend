import classes from './style.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Model from '../model/Model';

const Resetpassord = () =>{
    const [details , setdetails] = useState({});
    const [error , seteror] = useState(null);
    const [loding ,  setloding] = useState(true);
    const [valid ,setvalid] =useState(null);
    const [showpass, setshowpass] = useState(false);
    const [clicked , setclicked] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() =>{
        const date = window.Date.now()
        setloding(true)
        const fetch = async() => {
        try{
            await axios.post(`http://localhost:3001/auth/linkvalid`, {id:params.id , code: params.code, time:date});
            setvalid(null)
            setloding(false)
        }
        catch(error){
            setvalid(error.response.data.message)
            console.log(error.response)
            setloding(false)
        }
    }
    fetch()
    },[params.id , params.code])

    const submitHandler = async(event) =>{
        event.preventDefault();
        if(!(details.password && details.password1))
        {
            seteror("fill all the details")
        }
        else if(details.password !== details.password1){
            seteror("Passwords not matched")
        }
        else
        try{
            setclicked(true);
            await axios.post('http://localhost:3001/auth/Newpassword', {password:details.password , id: params.id });
            navigate('/auth/login')
        }
        catch(err){
            setclicked(false);
            seteror(err.response.data.error);
        }

    }
    const changeHandler = ({target:{name, value}}) =>{
        setdetails((prev) => ({...prev , [name]:value}) )
        seteror(null);
    }

    const changeHandlerc = () =>{
        setshowpass(prev => !prev);
    }

    return(
    <>
    {loding && <p className={classes.label}>...loading</p>}
    {!loding && ( valid!==null ? (<Model message={valid} label="Resend email" close={() =>{navigate('/home')}} ok={() => {navigate('/auth/forgotpassword')}}/>) :(
    <div className={classes.div}>
        <div className={classes.maindiv}>
            <div>
                <p className={classes.brand}>Tiny url</p>
                <p className={classes.message}>Reset Password</p>
            </div>
            <div>
              {error && <p className={classes.error}>{error}</p>}
              <form onSubmit={submitHandler} className={classes.form}>
              <label>Password</label>
              <input type={showpass ? "text":"password"} name='password' onChange={changeHandler} placeholder="Password"/>
              <label>Conform Password</label>
              <input type={showpass ? "text":"password"} name='password1' onChange={changeHandler} placeholder="Conform Password"/>
              <div className={classes.checkbox}><input type='checkbox' onChange={changeHandlerc}/><span>show password</span></div>
              <button disabled={clicked}>Reset password</button>
              </form>
            </div>
        </div>
      </div>))}
    </>);
}

export default Resetpassord;