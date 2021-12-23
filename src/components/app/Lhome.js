import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "./Card";
import classes from "./Lhome.module.css";
import Linkcard from "./LinkCard";
const Lhome = () => {
    const [details , setdetails] = useState("");
    const [res, setres] = useState({});
    const [show , setshow] = useState(false);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [clicked , setclicked] = useState(false);
    useEffect( () =>{
      const fetch = async() =>{
        const date = window.Date.now()
        const {data}= await axios.get('http://localhost:3001/short/myUrls',{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        var count=0, last24 = 0, lastmon =0;
        for(let i=0; i<data.length; i++){
            count = count+ data[i].clicked;
            if(data[i].date > date -86400000 )
            last24 = last24 +1;
            if(data[i].date > date -(86400000*30) )
            lastmon = lastmon +1;
        }
        setdata({count, last24, lastmon, len:data.length})
      }
      fetch()
    }, [])
    
    const fetch = async() =>{
      const date = window.Date.now()
      const {data}= await axios.get('http://localhost:3001/short/myUrls',{
      headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
      var count=0, last24 = 0, lastmon =0;
      for(let i=0; i<data.length; i++){
          count = count+ data[i].clicked;
          if(data[i].date > date -86400000 )
          last24 = last24 +1;
          if(data[i].date > date -(86400000*30) )
          lastmon = lastmon +1;
      }
      setdata({count, last24, lastmon, len:data.length})
    }

    const submitHandler = async (event) =>{
        event.preventDefault();
        if( details.length !==0){
        try{
            setclicked(true)
            const date = window.Date.now();
            const {data}= await axios.post('http://localhost:3001/short/generate',{url:details, date:date},{
            headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
            setres(data);
            setshow(true);
            setdetails(`https://localhost:3001/${data.shortid}`);
            setclicked(false)
            fetch();
        }
        catch{
            setclicked(false);
        }
        }
    }
    const changehandler = ({target:{value}}) =>{
        setdetails(value);
        if( value === ""){
            setshow(false)
        }
    }
  return (
    <div className={classes.Lhome}>
    <div className={classes.cardsdiv}>
        <Card name="TOTAL URLS" count={data.len} logo={<i className="fas fa-link"></i>} colour="ash"/>
        <Card name="TOTAL CLICKS" count={data.count} logo={<i className="fal fa-mouse-pointer"></i>} colour="pink"/>
        <Card name="LINKS ADDED THIS MONTH" count={data.lastmon} logo={<i className="fas fa-link"></i>} colour="yellow"/>
        <Card name="LINKS ADDED IN LAST 24 HOURS" count={data.last24} logo={<i className="fas fa-link"></i>} colour="orange"/>
    
    </div>
      {!show && <div className={classes.formdiv}>
        <form className={classes.form} onSubmit={submitHandler}>
          <input type="url" placeholder="Paste long url and shorten it" value={details} onChange={changehandler} />
          <button disabled={clicked}>Shorten</button>
        </form>
      </div>}

      {show && <div className={classes.formdiv}>
        <div className={classes.form}>
          <input type="url" placeholder="Paste long url and shorten it" value={details} onChange={changehandler} />
          <button onClick={() =>{navigator.clipboard.writeText(details)}}>Copy</button>
        </div>
      </div>}
      { show && 
      <Linkcard key ={res._id}
      tname={res.tname}
      url={res.url}
      surl= {`http://localhost:3001/${res.shortid}`}
      clicked = {res.clicked}
      date = {+res.date}
      id ={res._id}
      shortid = {res.shortid}
      refresh = {() =>{navigate('/home/d')}}
      />
      }

    </div>
  );
};

export default Lhome;
