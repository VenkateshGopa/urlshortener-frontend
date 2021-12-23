import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import Linkcard from "./LinkCard";
import classes from './Urls.module.css'
const Urls = () =>{
    const [data, setdata] = useState([]);
    useEffect( () =>{
        fetch();
    }, [])
    const fetch = async() =>{
        const {data}= await axios.get('https://tinyurlshortner.herokuapp.com/short/myUrls',{
        headers: {'Authorization': `Bearer ${localStorage.getItem('loggedin')}`}});
        setdata(data);
    }
    return(
     <Layout>
        <div className={classes.div}>
            <p className={classes.urls}>My Urls</p>
            {data.length === 0 && <p className={classes.center}>No Urls found</p>}
            {data.length !== 0 && data.map(ele =>(
            <Linkcard key ={ele._id}
            tname={ele.tname}
            url={ele.url}
            surl= {`https://goofy-perlman-361ca1.netlify.app/${ele.shortid}`}
            clicked = {ele.clicked}
            date = {ele.date}
            id ={ele._id}
            shortid = {ele.shortid}
            refresh = {fetch}
            />))}
        </div>
     </Layout>
    );
}
export default Urls;
