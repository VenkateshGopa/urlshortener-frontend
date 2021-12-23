import Home from '../Home';
import Layout from './Layout';
import Lhome from './Lhome';

const Dashboard = () =>{

    const token = localStorage.getItem('loggedin');
    
    return(
        <>
        {token && <Layout><Lhome/></Layout>}
        {!token && <Home/>}
        </>
    );
}

export default Dashboard;