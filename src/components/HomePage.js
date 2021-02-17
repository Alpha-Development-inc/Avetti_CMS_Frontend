import {Link} from 'react-router-dom';
import React from "react";
import { useQuery, gql } from '@apollo/client';

const ALL_PAGES = gql`
  query GetAllPages {
    allPages {
      title
      id
    }
  }
`;

const HomePage = () => {

  const requestOptions = {
    method: 'POST',
    body: `{
      allPages{
        id
        title
      }
    }
    `,
    fetchOptions: {

    }
};

fetch('http://localhost:8080/graphql', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data));

  // const {loading, error, data } = useQuery(ALL_PAGES);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  // return data.allPages.map(({ title, id }) => (
  //   <div>
  //     <p>
  //       {title}: {id}
  //     </p>
  //   </div>
  // ));

    return (
        
      <nav>
        <ul>
          <li>
            <Link to='/'>PageStarter</Link>
          </li>
          <li>
            <Link to='/pages/page1'>Page 1</Link>
          </li>
          <li>
            <Link to='/pages/page2'>Page 2</Link>
          </li>
          <li>
            <Link to='/pages/page3'>Page 3</Link>
          </li>
        </ul>
      </nav>
     
    );
  };
export default HomePage;