import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'react-bootstrap';

const Index = ({members}) => {
  return(
    <div className="members-container">
      <h1>Members</h1>
      <div className="grid wrapper">
      {members.map(note => {
          return (
            <div key={note._id}>
              <a>{note.email}</a>
              
            </div>
          )
        })}
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