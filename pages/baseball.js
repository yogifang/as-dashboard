import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState , useContext} from 'react';
import { useRouter } from 'next/router'
import { AppWrapper ,useAppContext } from '../components/AppContext' ;

const Baseball = ({ baseballplayers }) => {
  const router = useRouter() ;
  
  const {member , setMember} = useAppContext() ;
  const onMemberChange = (event) => {
   // console.log(event.target.value);
   setMember(event.target.value) ;
    router.push(`/baseballPage?member=${member}`) ;
  };
  return (
    <div>
      <h1>棒球選手</h1>
      <Form.Select aria-label='Default select example' onChange={onMemberChange}>
        {baseballplayers.map((player) => {
          if (player.sportItem !== 'baseball') return null;
          console.log(player.sportItem);
          return <option key={player._id}>{player.email}</option>;
        })}
      </Form.Select>
    </div>
  );
};

Baseball.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/members');
  const { data } = await res.json();
  return { baseballplayers: data };
};

export default Baseball;
