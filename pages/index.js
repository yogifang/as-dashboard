import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState, useEffect, useReducer, createContext } from "react";


const Index = () => {
  const [value, setValue] = useState('shooting');

   console.log("Index..........In" );
  return <div className='members-container'></div>
 
};

export default Index;
