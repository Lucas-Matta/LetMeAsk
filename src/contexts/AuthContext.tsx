import { useState, useEffect, createContext, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

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

// TypeScript
type AuthContextProviderProps = {
    // Sempre que for componentes do React, precisa ser ReactNode
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubsribe = auth.onAuthStateChanged(user => {
         // Verifica se tem informações no usuário
         if(user) {
           const { uid, photoURL, displayName } = user
               
           if(!displayName || !photoURL){
             throw new Error('Missing information from Google Account.');
           }
   
           setUser({
             id: uid,
             name: displayName,
             avatar: photoURL
           })
         }
       })
   
       return () => {
         unsubsribe();
       }
   
     }, [])
    
    // Função para o usuário logar
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
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}