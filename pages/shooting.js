import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { AppWrapper ,useAppContext } from '../components/AppContext' ;
const Shooting = ({ shooters }) => {

  const router = useRouter() ;
  const {member , setMember} = useAppContext() ;
  const onMemberChange = (event) => {
   console.log(event.target.value);
   setMember(event.target.value) ;
   console.log(member);
    router.push(`/shootingPage?member=${member}`) ;
  };
  return (
    <div>
      <h1>射擊選手</h1>
      <Form.Select aria-label='Default select example' onChange={onMemberChange}  >
        {shooters.map((player) => {
          if (player.sportItem !== 'shooting') return null;
          console.log(player.sportItem);
          return <option key={player._id}>{player.email}</option>;
        })}
      </Form.Select>
    </div>
  );
};

Shooting.getInitialProps = async () => {
  const url = process.env.HOST_URI + "api/members" ;
  const res = await fetch (url) ;
 // const res = await fetch('https://dashboard-chi-three.vercel.app/api/members');
  const { data } = await res.json(); 
  return { shooters: data };
};

export default Shooting;
