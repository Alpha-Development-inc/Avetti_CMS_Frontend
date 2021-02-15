import './App.css';


const pages = [
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
      {
        id : 2,
        name: '2nd row',
        contentComponents: [
          {
            text : 'Poor content'
          },
          {
            text : 'Not so poor content'
          }
        ]
      }
    ]
  }
];


function App() {
  return (
    <>
  <DisplayPages />
    </>
  );
}
function DisplayRowComponents(props){
  return(
    <div>
         <>
    {props.rowComponents.map((g)=>(<><button>edit</button><div>{g.text}</div></>))}
    </>
      </div>
  );
}

function DisplayContentRows(props){
  return(
    <>
    {props.contentRows.map((g)=>(<><p>{g.name}</p><DisplayRowComponents rowComponents={g.contentComponents}/></>))}
    </>
  );
}

function DisplayPages(){
  return(
    <div>
        { pages.map( (x) => (<><button onClick={addAPage}> add a page</button><button onClick={addARow}> add a row to a page</button><p>{x.name}</p><DisplayContentRows contentRows={x.contentRows}/></>))}
      </div>
    
  );
}

function addAPage(){

}

function addARow(){

}

function addAComponentToRow(){

}

export default App;
