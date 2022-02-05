import React, { component } from 'react';
import SideBar from './components/sidebar';
import Home from './components/home';
import Login from './components/login';
import ViewEmployee from './pages/viewemployee';
import AddEmployee from './pages/addemployee';
import EditEmployee from './pages/editemployee';
import Header from './components/header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { PrivateRoute } from 'react-auth-kit';
import {useIsAuthenticated} from 'react-auth-kit';


import './App.css';
import EditData from './components/editdata';
import { BASEURL } from './constants';


const Private = ({Component}) => {
  const isAuthenticated = useIsAuthenticated()
  const auth = isAuthenticated(); //your logic
  return auth ? <Component /> : <Navigate to="/login" />
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }


  render() {

   

      
      return (
        <div>
          <AuthProvider authType={'localstorage'}
            authName={'_auth'}>
            <Router>

              <Routes>
              <Route path="/dashboard" element={<Private Component={Home} />} />
              <Route path="/adduser" element={<Private Component={AddEmployee} />} />
              <Route path="/edituser" element={<Private Component={EditEmployee} />} />
              <Route path="/viewuser" element={<Private Component={ViewEmployee} />} />
              <Route path="/editdata/:id" element={<Private Component={EditData} />} />
              <Route exact path="/" element={<Private Component={Home} />} />
                <Route exact path="/login" element={<Login />} />
              

              </Routes>
            </Router>
          </AuthProvider>
        </div>
        
      );
    
  }
}


export default App;
