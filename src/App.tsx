import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import light from './styles/themes/light';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { Room } from './Pages/Room';
import { AdminRoom } from './Pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return(
    <BrowserRouter>
        <ThemeProvider theme={light}>
          <GlobalStyle />
          <AuthContextProvider>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rooms/new" component={NewRoom} />
                <Route path="/rooms/:id" component={Room} />
                <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </AuthContextProvider>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
