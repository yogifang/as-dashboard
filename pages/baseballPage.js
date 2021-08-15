import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { AppWrapper ,useAppContext } from '../components/AppContext' ;


const BaseballPage = () => {
      const {member , setMember} = useAppContext() ;   
      console.log(member) ;

      useEffect(() => {
            getBaseballInfo() ;
        }, [])

      const getBaseballInfo = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/baseballInfo/${member}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const json = await res.json();
                console.log(json.data);
            } catch (error) {
                console.log(error);
            }
        }

      return (
            <div>
                  <h1>Baseball Pages</h1>
            </div>
      ) ;
}



export default BaseballPage ;