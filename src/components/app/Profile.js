import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import classe from './Profile.module.css';
import classes from './../auth/style.module.css';
import Model from '../model/Model';
import { useNavigate } from 'react-router';
const Profile = () =>{
    const [profile , setprofile]  = useState({});
    const [error , seteror] = useState(null);
    const [details , setdetails] = useState({});
    const [dis , setdis] = useState(false);
    const [showpass, setshowpass] = useState(false);
    const [clicked , setclicked] = useState(false);
    const [valid , setvalid] = useState(false);
    const navigate = useNavigate();
    const show = () =>{
        setdis(prev => !prev)
    }
    useEffect(() =>{
        fetch();
    },[])
    const fetch = async() =>{
        const {data}= await axios.get('https://tinyurlshortner.herokuapp.com/short/profile',{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        setprofile(data);
    }
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
            await axios.post('https://tinyurlshortner.herokuapp.com/short/password', {password:details.password},{
                headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
            setvalid(true);
            // navigate('/auth/login')
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
    const redir = () =>{ 
        localStorage.removeItem('loggedin')
        navigate('/auth/login');
    }
    return(
        <Layout>
            {valid && <Model message="Password Changed successfully click here to login" label="Login" close={redir} ok={redir}/>}
            <div className={classe.div}>
                <div className={classe.field}>
                    <p className={classe.name}>First Name : </p>
                    <p className={classe.value}>{profile.firstname}</p>
                </div>
                <div className={classe.field}>
                    <p className={classe.name}>Last Name : </p>
                    <p className={classe.value}>{profile.lastname}</p>
                </div>
                <div className={classe.field}>
                    <p className={classe.name}>Email : </p>
                    <p className={classe.value}>{profile.email}</p>
                </div>
                <button onClick={show}>Change Password</button>
                {error && <p className={classes.error}>{error}</p>}
                {dis && 
                <form onSubmit={submitHandler} className={classe.form}>
                <label>Password</label>
                <input type={showpass ? "text":"password"} name='password' onChange={changeHandler} placeholder="Password"/>
                <label>Conform Password</label>
                <input type={showpass ? "text":"password"} name='password1' onChange={changeHandler} placeholder="Conform Password"/>
                <div className={classes.checkbox}><input type='checkbox' onChange={changeHandlerc}/><span>show password</span></div>
                <button disabled={clicked}>Reset password</button>
                </form>
                }
            </div>
        </Layout>
    );
}

export default Profile;
