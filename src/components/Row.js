import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import Demo from './Dialog';
const Row =(props)=>{
    const [rowComponents,setRowComponents]=useState([]);
    function addNewComponent(){
        ReactDOM.render(<Demo />, document.querySelector('#root'));
    }

    return(
        <div id="row">
            <div id ='buttons'>
                    <button onClick={addNewComponent}>
                        +
                    </button>
                    <button>
                        ^
                    </button>
                    <button>
                        v
                    </button>
                    <button>
                        delete
                    </button>
                    <button>
                        edit
                    </button>
            </div>
            <div id='contentcomponent'>
                {props.rowComponents.map((g)=>(g.data))}
            </div>
        </div>
        
    )
}

export default Row;