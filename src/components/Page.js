import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from './Page.module.css';
const Page = () =>{
    const params = useParams();
    const [valid , setvalid] = useState(true);
    useEffect(() =>{
        const fetch = async() => {
            try{
                const {data} = await axios.get(`http://localhost:3001/${params.id}`);
                setvalid(data)
                window.location.assign(data.url)
            }
            catch(error){
                setvalid(false)
            }
        }
        fetch();
    },[params.id])
    return(
        <>
        {!valid && <div className={classes.notfounddiv}>
        <p className={classes.p404}>404</p>
        <p className={classes.notfound}>Page Not Found</p></div>}
        </>
    );
}

export default Page;