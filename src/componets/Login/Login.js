import React, { useContext, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../SignUp/SignUp.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../FirebaseConfig';
import {MassegeContext, userContext} from '../../App';

// firebase initialize
if(firebase.apps.length < 0){
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {

    // change title
    useEffect(()=> {
        document.title = 'Taravel Guru | Login'
    })

    // hsitory hook
    const history = useHistory()

    // location hook
    const location = useLocation()

    // preloading show and hide state
    const [loading, setLoading] = useState(false)

    // input error massege set and get state
    const [inputErrorMassege, setInputErrorMassege] = useState('')

    // signup successs massete get by context api
    const signupSuccessMassege = useContext(MassegeContext)[0]

    // user login set by context api
    const setUserLogged = useContext(userContext)[1]

    // login data set and get state
    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    })

    // set login after location
    let { from } = location.state || { from: { pathname: "/" } };

    // input on blur event
    const onBlurHendaler = (e) => {
        let name = e.target.name
        let value = e.target.value
        if(name === 'email'){
            setLoginData({...loginData,email:value})
        }
        if(name === 'password'){
            setLoginData({...loginData,password:value})
        }
        
    }

    // on submit event
    const formHendaler = (e) => {
        e.preventDefault()

        if(loginData.email){
            setLoading(true)
            firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((res) => {
                console.log(res)
                setLoading(false)
                setUserLogged({email:res.user.email,name:res.user.displayName})
                history.replace(from);
            })
            .catch((error) => {
                setLoading(false)
                setInputErrorMassege(error.message)
              });
        }
        
    }


    // Google Login

    const loginGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((res) => {
            setUserLogged({email:res.user.email,name:res.user.displayName})
            history.replace(from);
        })
        .catch((error) => {
            setInputErrorMassege(error.message)
        });

    }

    // Facebook Login

    const loginFacebook = () => {

        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult()
        .then((res) => {
            setUserLogged({email:res.user.email,name:res.user.displayName})
            history.replace(from);
        })
        .catch((error) => {
            setInputErrorMassege(error.message)
        })
    }

    // button style
        const btnStyle = {
            color: 'rgb(0, 0, 0)',
            background: 'rgb(249, 165, 26)',
            padding: '17px 28px',
            fontFamily: 'Montserrat',
            fontSize: '16px',
            letterSpacing: '2px',
            border: '0',
            outline: '0',
            display: 'block',
            width: '100%',
            cursor: 'pointer',
            margin: '32px 0 15px 0',
            borderRadius:'5px'
        }

        // return login component
    return (
        <>
        <div className="form-signup">
            
            <form onSubmit={formHendaler}>
            <b style={{color:'green'}}>{signupSuccessMassege && signupSuccessMassege}</b>
                <h4>Login</h4>
                <TextField type="email" onBlur={onBlurHendaler} name="email" id="email" label="Email" required/>
                <TextField type="password" onBlur={onBlurHendaler} name="password" id="password" label="Password" required/>
                <div>
                <FormControlLabel control={<Checkbox/>} label="Remember me"/>
                <Link style={{float:'right',marginTop:'5px',color:' rgb(249, 165, 26)'}} to='/forgottenpass'>Forgot Password</Link>
                </div>
                <b style={{color:'red'}}>{inputErrorMassege && inputErrorMassege}</b>
                <input style={btnStyle} type="submit" value="Login"/>
                {
                    loading && <LinearProgress/>
                }
                <div style={{textAlign:"center"}}><span>Don't have an account? </span><Link to="/signup" style={{color:'rgb(249, 165, 26)'}}>Create an account</Link></div>
            </form>
        </div>
        <div className="or"></div>
        <div style={{paddingBottom:'50px'}}>
        <div onClick={loginFacebook} className="facebook">Continue with Facebook</div>
        <div onClick={loginGoogle} className="google">Continue with Google</div>
        </div>
        </>
    );
};

export default Login;