import {Link} from 'react-router-dom';
import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Box, Button, makeStyles } from '@material-ui/core';
import '../styles/HomePage.css';

const ALL_PAGES = gql`
  query GetAllPages {
    allPages {
      title
      id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
}))

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

      <Box display="flex" flexDirection="column" alignItems="flex-start">
        
        <Box m="10px">
          <Button className="navitem" variant="contained" color="primary" href="/page1">Page 1</Button>
        </Box>
        
        <Box m="10px">
          <Button className="navitem" variant="contained" color="primary" href="/page2">Page 2</Button>
        </Box>
        
        <Box m="10px">
          <Button className="navitem" variant="contained" color="primary" href="/page3">Page 3</Button>
        </Box>
        
      </Box>
     
    );
  };
export default HomePage;