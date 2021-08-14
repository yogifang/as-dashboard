import Link from 'next/link';

import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';

const Index = () => {
  const [value, setValue] = useState('shooting');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return <div className='members-container'></div>;
};

export default Index;
