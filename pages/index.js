import Link from 'next/link';

import fetch from 'isomorphic-unfetch';
import { Button, Card  , Form} from 'react-bootstrap';
import { useState } from 'react';

const Index = ({members}) => {
const [value , setValue] = useState('shooting') ;
 

 const handleChange = (event) => {
  setValue(event.target.value);
    
  }

  return(
    <div className="members-container">
      <h1>運動項目</h1>
      <div className="grid wrapper">

      <Form.Select aria-label="Default select example" value={value} onChange={handleChange}>
      <option value="shooting">射擊</option>
      <option value="baseball">棒球</option>
      </Form.Select>


      <h1>選手</h1>
      <Form.Select aria-label="Default select example">

      {members.map(note => {
         
         console.log(value) ;
          if (note.sportItem !== value ) return null ;
          console.log(note.sportItem) ;
          return (
              <option>
              {note.email}
            </option>
           
          )
        })}
        </Form.Select>
      </div>
    </div>
  ) ;
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/members');
 
  const { data } = await res.json();
  console.log (data) ;
  return { members: data }
}

export default Index ;