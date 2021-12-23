import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Activate from './components/auth/Activate';
import Forgotpassword from './components/auth/Forgotpassword';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Resetpassord from './components/auth/Resetpassword';
import Publicroute from './components/Publicroute';
import Privateroute from './components/Privateroute';
import Urls from './components/app/Urls';
import Dashboard from './components/app/dashboard';
import Page from './components/Page';
import Profile from './components/app/Profile';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate replace to='/home'/>} />
        <Route path='auth/login' element={<Publicroute><Login/></Publicroute>} />
        <Route path='auth/signup' element={<Publicroute><Register/> </Publicroute>} />
        <Route path='/active/:id' element={<Publicroute><Activate/> </Publicroute>}/>
        <Route path='auth/forgotpassword' element={<Publicroute><Forgotpassword/> </Publicroute>} />
        <Route path='auth/:id/:code' element={<Publicroute><Resetpassord/> </Publicroute>}/>
        <Route path='/home' element={ <Dashboard/>} />
        <Route path='/myurls' element={<Privateroute><Urls/></Privateroute>}/>
        <Route path='/profile' element={<Privateroute><Profile/></Privateroute>}/>
        <Route path= '/:id' element={<Page/>}/>
        <Route path='*' element={<Navigate replace to='/home'/>} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
