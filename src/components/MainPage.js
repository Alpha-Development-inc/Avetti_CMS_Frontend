import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import  Page from "./Page";

const MainPage =()=>{
    const [pages,setPages]=useState([
        {
          id: 1,
          name: 'First page',
          contentRows : [
            {
              id : 1,
              name: '1st row',
              contentComponents: [
                {
                  text : 'First row first conponent'
                },
                {
                  text : 'first row second  component'
                }
              ]
            },
            
            
          ]
        }
      ]);
      let prevId=1;
      function addAPage(){
            setPages([
                ...pages,
                { id: ( prevId += 1),
                    name: prevId +'st  page',
                    contentRows : [
                    ]
                }
            ])
             ReactDOM.render(<Page id={pages[0].id} data={pages}/>,document.getElementById('root'))
      }
      
    return(
        <button onClick={addAPage}>add a page </button>
    )
}
export default MainPage;