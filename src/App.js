import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import Page from './components/Page';

const App = () =>{
  return (
      <BrowserRouter>
        
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/pages/:pageTitle' component={Page} />
        </Switch>

      </BrowserRouter>
    );
};

export default App;
