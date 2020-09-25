import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import './SignUp.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../FirebaseConfig';
import { MassegeContext, userContext } from '../../App';

// firebase initialize
firebase.initializeApp(firebaseConfig);


const SignUp = () => {

    // change title
    useEffect(()=> {
        document.title = 'Taravel Guru | Sign Up'
    })

    // show and hide preloading state
    const [loading, setLoading] = useState(false)

    // history hook
    const history = useHistory()

    // location hook
    const location = useLocation()

    // signup success message set by context api
    const setSignupSuccessMassege = useContext(MassegeContext)[1]

    // user login set by context api
    const setUserLogged = useContext(userContext)[1]

    // login after location set
    let { from } = location.state || { from: { pathname: "/" } };

    // input error megggage set and get state
    const [inputErrorMassege, setInputErrorMassege] = useState({
        fnameError:'',
        lnameError:'',
        emailError:'',
        passwordError:'',
        cpasswordError:'',
        Error:'',
    })

    // input data set and get state
    const [inputData, setInputData] = useState({
        fname:'',
        lname:'',
        email:'',
        password:'',
        cpassword:''
    })
    
    // input on blur event
    const onBlurHendaler = (e) => {

        let name = e.target.name
        let value = e.target.value

        // Start Form validation
        if(name === 'fname'){
            value === '' ? setInputErrorMassege({...inputErrorMassege,fnameError:'Please provide your First name !'}) : setInputErrorMassege({...inputErrorMassege,fnameError:''});setInputData({...inputData,'fname':value})
        }
        if(name === 'lname'){
            value === '' ? setInputErrorMassege({...inputErrorMassege,lnameError:'Please provide your Lirst name !'}) : setInputErrorMassege({...inputErrorMassege,lnameError:''});setInputData({...inputData,'lname':value})
        }
        if(name === 'email'){
           
            if(value === ''){ 
               setInputErrorMassege({...inputErrorMassege,emailError:'Please provide your Email !'})
            }else if(/(.+)@(.+){2,}\.(.+){2,}/.test(value)){
                setInputErrorMassege({...inputErrorMassege,emailError:''}) 
                setInputData({...inputData,'email':value})
            }else{ 
               setInputErrorMassege({...inputErrorMassege,emailError:'Please enter correct email ID !'})
            }  

        }
        if(name === 'password'){

            if(value === ''){ 
               setInputErrorMassege({...inputErrorMassege,passwordError:'Please provide Password !'})
            }else if(value.length < 8){
                setInputErrorMassege({...inputErrorMassege,passwordError:'Password Minimum 8 characters !'}) 
            }else{ 
               setInputErrorMassege({...inputErrorMassege,passwordError:''})
               setInputData({...inputData,'password':value})
            } 

        }
        if(name === 'cpassword'){
            value === inputData.password ? setInputErrorMassege({...inputErrorMassege,cpasswordError:''}) : setInputErrorMassege({...inputErrorMassege,cpasswordError:'Your password and confirmation password do not match !'})
            setInputData({...inputData,'cpassword':value})
        }
    } 

    // form on submit event
    const formHendaler = (e) => {

        e.preventDefault()

        let fname = inputData.fname
        let lname = inputData.lname
        let email = inputData.email
        let password = inputData.password
        let cpassword = inputData.cpassword

        if(fname !== '' && lname !== '' && email !== '' && password !== '' && password === cpassword){

            setLoading(true)
            e.target.reset()
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser;

                    user.updateProfile({
                    displayName: fname+' '+lname,
                    }).then(() => {

                        setLoading(false)
                        history.push('/login')
                        setSignupSuccessMassege('Account create Successfully, please Login now.') 
                      
                    })
            })
            .catch(error => {
              
                setLoading(false)
                var errorMessage = error.message;
                setInputErrorMassege({...inputErrorMassege,Error:errorMessage})
               
              });

        }else{
            setInputErrorMassege({...inputErrorMassege,Error:'Something Wrong Please Try Again !'})
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
            setInputErrorMassege({...inputErrorMassege,Error:error.message})
        });

    }


    // Facebook Login

    const loginFacebook = () => {

        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((res) => {
            setUserLogged({email:res.user.email,name:res.user.displayName})
            history.replace(from);
        })
        .catch((error) => {
            setInputErrorMassege({...inputErrorMassege,Error:error.message})

        })
    }

        // button stayle
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
            margin: '10px 0',
            borderRadius:'5px'
        }

        // return signup component
    return (
        <>
        <div className="form-signup">
            
            <form onSubmit={formHendaler}>
                <h4>Create an account</h4>
                <TextField name="fname" className={inputErrorMassege.fnameError && 'error'} onBlur={onBlurHendaler} id="fname" label="First Name" required />
                <b style={{color:'red'}}>{inputErrorMassege.fnameError}</b>
                <TextField name="lname" className={inputErrorMassege.lnameError && 'error'} onBlur={onBlurHendaler} id="lname" label="Last Name" required/>
                <b style={{color:'red'}}>{inputErrorMassege.lnameError}</b>
                <TextField type="email" className={inputErrorMassege.emailError && 'error'}  onBlur={onBlurHendaler} name="email" id="email" label="Email" required/>
                <b style={{color:'red'}}>{inputErrorMassege.emailError}</b>
                <TextField type="password" className={inputErrorMassege.passwordError && 'error'} onBlur={onBlurHendaler} name="password" id="password" label="Password" required/>
                <b style={{color:'red'}}>{inputErrorMassege.passwordError}</b>
                <TextField type="password" onBlur={onBlurHendaler} name="cpassword" id="cpassword" label="Confrim Password" required/>
                <b style={{color:'red'}}>{inputErrorMassege.cpasswordError}</b>
                <input style={btnStyle} type="submit" value="Create an account"/>
                <b style={{color:'red'}}>{inputErrorMassege.Error}</b>

                {
                    loading && <LinearProgress/>
                }
                
                <div style={{textAlign:"center"}}><span>Already have an account? </span><Link to="/login" style={{color:'rgb(249, 165, 26)'}}>Login</Link></div>
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

export default SignUp;