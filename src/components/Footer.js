import classes from './Footer.module.css';

const Footer = () => {
  return (
  <div>
      <div className={classes.footer}>
          
          <p className={classes.brand}><span className={classes.logo}>T</span>Tiny url</p>
          <p className={classes.message}>Tiny url | Free URL Shortener, Link Management</p>
          <div className={classes.icons}>
          <i className="fab fa-twitter-square fa-2x"></i>
          <i className="fab fa-google-plus-square fa-2x"></i>
          <i className="fab fa-facebook-square fa-2x"></i>
          <i className="fab fa-youtube-square fa-2x"></i>
          </div>
      </div>
      <div className={classes.copyrights}>
          <p> &#9400; 2021 Tiny url</p>
      </div>
  </div>);
};

export default Footer;
