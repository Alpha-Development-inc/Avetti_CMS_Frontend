import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import Page from './components/Page';
import PageWrapper from './components/PageWrapper';

const App = () =>{
  return (
      <BrowserRouter>
        
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/:pageTitle' component={PageWrapper} />
        </Switch>

      </BrowserRouter>
    );
};

export default App;
