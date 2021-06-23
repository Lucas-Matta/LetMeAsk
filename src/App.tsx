import { useState } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { auth, firebase } from '../services/firebase';

export const AuthContext = createContext({} as any);

function App() {
  const [user setUser] = useState();

  function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
        if(result.user){
            const { displayName, photoUrl, uid } = result.user

            if(!displayName || !photoUrl){
              throw new Error('Missing information from Google Account.');
            }
        }
    })
  }

  return(
    <BrowserRouter>
        <AuthContext.Provider value={{ value, setValue }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms/new" component={NewRoom} />
        </AuthContext.Provider> 
    </BrowserRouter>
  )
}

export default App;
