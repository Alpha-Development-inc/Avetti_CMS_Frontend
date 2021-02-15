import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import React from "react";
const Navigation = () => {
    return (
        
      <nav>
        <ul>
          <li>
            <Link to='/'>PageStarter</Link>
          </li>
          <li>
            <Link to='/Page1'>Page1</Link>
          </li>
          <li>
            <Link to='/Page2'>page2</Link>
          </li>
          <li>
            <Link to='/Page3'>page3</Link>
          </li>
        </ul>
      </nav>
     
    );
  };
export default Navigation;