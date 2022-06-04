import React from 'react';
import './App.css';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import banner from './assets/banner.png';
import {useAuthState} from 'react-firebase-hooks/auth';
import fork from './functions/fork';
import openPR from './functions/pr';
import commit from './functions/commit';
import { GithubAuthProvider, OAuthCredential } from 'firebase/auth';
import config from './config.json';
import vars from './vars'
firebase.initializeApp({
  apiKey: "AIzaSyANhO3IRrH41j-IO-7v9tS2ussFaCgDT8k",
  authDomain: "owl-beta.andrewstech.me",
  projectId: "register-is-a-dev",
  storageBucket: "register-is-a-dev.appspot.com",
  messagingSenderId: "434618976400",
  appId: "1:434618976400:web:a0ee5330e20dc77e15f015",
  measurementId: "G-ZQ6B6DSS7M"
});
const auth = firebase.auth();
const githubLoginProvider = new firebase.auth.GithubAuthProvider();
//auth.signInWithPopup(provider)
function SignIn() {

  return (
    <button className='button signIn' onClick={()=> {
      githubLoginProvider.addScope('repo');  
      auth.signInWithPopup(githubLoginProvider).then((res)=>{
       console.log(res.credential.accessToken);
       vars.token = res.credential.accessToken
       vars.user = res.user.displayName;
       vars.email = res.user.email;
       Object.freeze(vars)
       //fork on login
       fork('test-project') 
      })
    }}>Sign In With GitHub</button>
  );
}

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header><img alt='banner.png' src={banner}></img></header>
      <>
      {user ? <Dashboard /> : <SignIn />}
      </>
    </div>
  );
}

function SignOut() {
  return (
    <button className='signOut button' onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Dashboard(props) {
  
  const name = auth.currentUser.displayName;
  const pfp = auth.currentUser.photoURL;

  return (
    <>
    <center>
    <img alt='pfp.png' className='pfp userItem-1' src={pfp}></img>
      <div className='userItemContainer'>
        <h2 className='white userItem-2'>Logged In As {name}</h2>
      </div>
      <SignOut />
      <button className='delete button-red' onClick={() => auth.currentUser.delete()}>Delete Account</button>
      <h3>Please do not share the link for this beta, however you can share screenshots!</h3>
    </center>
    </>
  ) 
  }

export default App;
