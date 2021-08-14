import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';

const Baseball = ({ baseballplayers }) => {
  const onMemberChange = (event) => {
    console.log(event.target.value);
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
  console.log(data);
  return { baseballplayers: data };
};

export default Baseball;
