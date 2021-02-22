import React, { useState } from 'react';
import Row from "./Row";
import ReactDOM from 'react-dom';
import Demo from './Dialog';
import { useEffect } from 'react';

const Page =(props)=>{

    const [page,setPage]=useState({
        contentRows:[]
    });

     
    // function addRow(){
    //     prevRowId=prevRowId+1;
    //     setRows([...rows,
    //             {
    //                 id:prevRowId,
    //                 order:prevRowId,
    //                 contentComponents:[]
    //             }])
    // } 
    
    // function addRowNew(){
    //     prevRowId=prevRowId+1;
    //     setPages(
    //         [...pages,
    //             {
    //               id: (prevRowId),
                  
    //               contentRows : [
    //                 {
    //                   id : (prevRowId+=1),
    //                   orderNumber:1,
    //                   contentComponents: [
    //                  {
                         
    //                  }
    //                   ]
    //                 },
                    
                    
    //               ]
    //             }
               
    //         ]
    //     )
    //     console.log(pages);
    //     //ReactDOM.render(<Row />,document.getElementById('page'))
    // }

    const requestOptions = {
        method: 'POST',
        body: `{
          page(title:"${props.match.params.pageTitle}"){
            id
            title
            contentRows{
                contentComponents{
                    text
                }
            }
          }
        }
        `
    };

    useEffect(() => {

        fetch('http://localhost:8080/graphql', requestOptions)
            .then(response => response.json())
            .then(data => setPage(data.data.page));

    },[]);

    if (!page) {return (<div>No rows</div>)}    

    return(
        <div id="page">
            <div id ='buttons'>
                    <button>
                        +
                    </button>
                    
                    
            </div>
            <div id='rowcontent'>
                {page.contentRows.map((g)=>(<Row rowComponents={g.contentComponents}/>))}
            </div>
        </div>
        
    )
}
export default Page;





