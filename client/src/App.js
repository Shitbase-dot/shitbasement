import React from 'react';
import 'materialize-css';
import useRouter from './routers';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Navbar } from './components/Navbar';
import {Loader} from './components/Loader'

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  console.log(isAuthenticated)
  const routes = useRouter(isAuthenticated);

  if(!ready) {
    return <Loader/>
  }

  return (
    
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar/>}
        <div className="container">
          
              {routes}
          
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
