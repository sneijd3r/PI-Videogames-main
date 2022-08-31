import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import CreateGame from './components/CreateGame'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/details/:id' component={Details}/>
      <Route path='/creategame' component={CreateGame}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
