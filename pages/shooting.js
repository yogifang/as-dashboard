import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';

const Shooting = ({ shooters }) => {
  return (
    <div>
      <h1>射擊選手</h1>
      <Form.Select aria-label='Default select example'>
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
  const res = await fetch('http://localhost:3000/api/members');

  const { data } = await res.json();
  console.log(data);
  return { shooters: data };
};

export default Shooting;
