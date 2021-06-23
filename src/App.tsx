import { useState } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { auth, firebase } from './services/firebase';

// TypeScript
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

// TypeScript
type User = {
  id: string;
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    // Verifica se o usuário logou no sistema
    const result = await auth.signInWithPopup(provider);

        if(result.user){
            const { uid, photoURL, displayName } = result.user
            
            if(!displayName || !photoURL){
              throw new Error('Missing information from Google Account.');
            }

            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
        }
  }

  return(
    <BrowserRouter>
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms/new" component={NewRoom} />
        </AuthContext.Provider> 
    </BrowserRouter>
  )
}

export default App;
