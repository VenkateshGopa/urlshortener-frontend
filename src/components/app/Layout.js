import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Layout.module.css';
import { useNavigate } from 'react-router';

const Layout = (props) =>{
    const [nav , setnav]= useState(false);
    const navigate = useNavigate();
    const shownav = () =>{
        setnav((prev) => (!prev));
    }
    const logout = () =>{
      localStorage.removeItem('loggedin')
      navigate('/myurls');
    }
    return(
      <div>
        <div className={nav ? `${classes.left} ${classes.lefth}` : classes.left }><ul>
            <li onClick={shownav} className={classes.closebtn}><i className="fas fa-times"></i></li>
            <li><NavLink to="/home" >Dashboard</NavLink></li>
            <li><NavLink to="/myurls" >My Urls</NavLink></li>
            <li><NavLink to="/profile" >Profile</NavLink></li>
            <div className={classes.logout}>
              <button className={classes.button} onClick={logout}>Logout</button>
            </div>
            </ul>
        </div>

        <div className={classes.right}>
            <div className={classes.header}>
                <div className={classes.buttons}>
                  <p onClick={shownav} >|||</p>
                </div>

                <div className={classes.brand}>
                  <p>Tiny url</p>
                </div>
            </div>
            {props.children}
        </div>

    </div>
    );

}

export default Layout;