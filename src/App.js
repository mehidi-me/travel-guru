
import React, { createContext, useState } from 'react';
import './App.css';
import Home from './componets/Home/Home';
import Navbar from './componets/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BookingForm from './componets/BookingForm/BookingForm';
import logo from './images/Logo2.png';
import SignUp from './componets/SignUp/SignUp';
import Login from './componets/Login/Login';
import Location from './componets/Location/Location';
import PrivateRoute from './PrivetRoute';
import "firebase/analytics";

// set and get signup message context api
export const MassegeContext = createContext()

// set and get user login context api
export const userContext = createContext()

function App() {

  // state set and get signup message
  const [signupSuccessMassege, setSignupSuccessMassege] = useState('')

  // state set and get user login
  const [userLogged, setUserLogged] = useState({email:'',name:''})

  return (
    <>
   <Router>
     <Switch>

       {/* signup message provider value  */}
       <userContext.Provider value={[userLogged, setUserLogged]}>

         {/* user login provider value */}
      <MassegeContext.Provider value={[signupSuccessMassege, setSignupSuccessMassege]}>

        <Route exact path='/'>
        <div className="App">
          <Navbar/>
          <Home/>
          </div>
        </Route>

        <Route exact path='/booking-form/:id'>
          <div className="App">
          <Navbar/>
          <BookingForm></BookingForm>
          </div>
        </Route>

        <Route exact path='/signup'>
          <div className="App2">
              <Navbar logo={logo} color="default"/>
              <SignUp></SignUp>
          </div>
        </Route>

        <Route exact path='/login/'>
          <div className="App2">
              <Navbar logo={logo} color="default"/>
              <Login></Login>
          </div>
        </Route>

        <PrivateRoute path="/location/:id">
          <div className="App2">
                <Navbar logo={logo} color="default"/>
                <Location></Location>
            </div>
        </PrivateRoute>

       </MassegeContext.Provider>
       </userContext.Provider>
     </Switch>
   </Router>
      
    </>
  );
}

export default App;
