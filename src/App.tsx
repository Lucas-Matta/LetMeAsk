import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { Room } from './Pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return(
    <BrowserRouter>
        <AuthContextProvider>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/rooms/new" component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
          </Switch>
        </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
