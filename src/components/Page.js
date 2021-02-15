import React, { useState } from 'react';
import Row from "./Row";
import ReactDOM from 'react-dom';
import Demo from './Dialog';

const Page =(props)=>{
    const [pages,setPages]=useState([]);
    const [rows,setRows]=useState([]);
     let prevRowId=0
     function addRow(){
        prevRowId=prevRowId+1;
        setRows([...rows,
                {
                    id:prevRowId,
                    order:prevRowId,
                    contentComponents:[]
                }])
     }
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
    return(
        <div id="page">
            <div id ='buttons'>
                    <button onClick={addRow}>
                        +
                    </button>
                    
                    
            </div>
            <div id='rowcontent'>
                {/* {pages.map((g)=>(g.contentRows.map((g)=>(<><Row rowComponents={g.contentComponents}/></>))))} */}
                {rows.map((g)=>(<><Row rowComponents={g.contentComponents}/></>))}
            </div>
        </div>
        
    )
}
export default Page;