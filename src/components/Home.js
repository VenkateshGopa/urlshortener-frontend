import Header from './auth/Header';
import Footer from './Footer';
import classes from './Home.module.css';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import Model from './model/Model';
const Home = () => {
    const [model , setmodel] = useState(false);
    const navigate = useNavigate();
    const submitHandler = (event) =>{
        event.preventDefault();
        setmodel(true);
    }
    const close = () => {
        setmodel(false);
    }
    const login =() =>{
        navigate('/auth/login');
    }
    const Signup = () =>{
        navigate('/auth/signup');
    }

  return (
    <>
    {model && <Model message=' Please Login to "Continue" ' label="Login" close={close} ok={login}/>}
    <Header/>
    <div className={classes.top}>
    <div className={classes.topdiv}>
      <p className={classes.muted}>URL Shortener</p>
      <p className={classes.boldmessage}>Here you have full control over your links.</p>
      <p className={classes.medmutet}>Link Management Platform with all features you need in one place. Shorten, manage and track your links the easy way.</p>
      <div className={classes.button}>
      <button onClick={login}>Login</button>
      <button onClick={Signup}>Signup</button>
      </div>
    </div>
    <div className={classes.logo}>
        <p>Tiny url</p>
    </div>
    </div>

    <div className={classes.formdiv}>
      <form className={classes.form} onSubmit={submitHandler}>
        <input type='url' placeholder="Paste long url and shorten it" />
        <button>Shorten</button>
      </form>
    </div>

    <div className={classes.details}>
    <div>
        <p className={classes.heading}>Link analytics, URL shortener</p> 
        <p className={classes.message}>Don't let the links limit you. The new standard of shortening links. A new standard for link analytics. Discover unique redirects analytics - work with your team together building your brand engagment. Manage your links like a pro.</p>
    </div>
     
    <div className={classes.cards}>
        <div className={classes.d}>
            <p className={classes.dheading}>URL Shortener</p>
            <p className={classes.dmessage}>Free custom URL Shortener with many features that gives you better quality for links shortening. Shortened URLs will never expire. We do not display ads during direct redirecting to the original url.</p>
            <button onClick={Signup} >Sign up</button>
        </div>
        <div className={classes.d}>
            <p className={classes.dheading}>Link Analytics Platform</p>
            <p className={classes.dmessage}>Track each shortened link and measure its performance to understand it. Detailed analytics provides you info about clicks.</p>
            <button onClick={Signup} >Sign up</button>
        </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
