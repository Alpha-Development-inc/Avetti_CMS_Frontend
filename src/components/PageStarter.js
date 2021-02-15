import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Navigation from "./Navigation";
const PageStarter = () =>{
    return (
        <BrowserRouter>
          
          <Switch>
            <Route path='/' exact component={Navigation} />
            <Route path='/page1' component={Page1} />
            <Route path='/page2' component={Page2} />
            <Route path='/page3' component={Page3} />
            </Switch>
        </BrowserRouter>
      );
};

  export default PageStarter;