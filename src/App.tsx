import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return(
    <BrowserRouter>
        <AuthContextProvider>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms/new" component={NewRoom} />
        </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
