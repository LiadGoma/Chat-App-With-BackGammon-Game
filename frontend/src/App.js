

import { Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp';
import Login from './components/LogIn/Login';
import HomePage from './components/HomePage/HomePage';
import LogOut from './components/LogOut/LogOut';
import { useEffect,useState } from 'react';
import auth from "./services/authService";
import Game from './components/gameComponents/Game/Game';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const curUser = auth.getCurrentUser();
        setCurrentUser(curUser);
    }, [])
  return (
    <div>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/logout" component={LogOut} />
        <Route path="/" component={HomePage}  />
      </Switch>
    </div>
  );
}

export default App;
