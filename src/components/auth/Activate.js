import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Model from '../model/Model';
const Activate = ( ) =>{

    const [active, setactive] = useState();
    const [loading , setloading] = useState();
    const navigate = useNavigate();
    const params = useParams();
    useEffect( ()=>{
    setloading(true)
    const fetch = async() => {
    try{
        await axios.post(`https://tinyurlshortner.herokuapp.com/auth/activation`, {id:params.id });
        setactive("your account is activated click here to login")
        setloading(false)
    }
    catch(error){
        setactive(error.response.data.error)
        setloading(false)
    }
}
fetch()
},[params.id , params.code])
    return(
        <div>
            {loading && <p>loading...</p>}
            {!loading && <Model message={active} label="Login" close={() =>{navigate('/home')}} ok={() => {navigate('/auth/login')}}/>}
        </div>
    )
}
export default Activate;
